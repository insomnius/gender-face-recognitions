'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as tf from '@tensorflow/tfjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload, faMale, faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { faFemale } from "@fortawesome/free-solid-svg-icons/faFemale";

interface FileWithPreview extends File {
  preview: string;
  gender: string;
  confidence: number;
  inferenceDuration: number;
}

interface PredictionResult {
  confidence: number;
  gender: string;
  inferenceDuration: number;
}


export default function Home() {
  const [model, setModel] = useState<tf.GraphModel>()
  const [inputState, setInputState] = useState<string>('available')
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 5,
    accept: {
      'image/png': ['.png', '.jpeg', '.jpg'],
    },

    validator: function (file) {
      if (inputState == 'disabled') {
        return {
          code: "in-progress",
          message: `Progressing, cannot uploading new file`
        };
      }
      return null
    },

    onDrop: async function (acceptedFiles) {
      let files = [] as FileWithPreview[]
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i]
        const predictionResult = await prediction(file)
        if (predictionResult.gender == undefined) {
          continue
        }

        files.push(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            gender: predictionResult.gender,
            confidence: predictionResult.confidence,
            inferenceDuration: predictionResult.inferenceDuration,
          }),
        )
      }
      setFiles(files)
    }

  });

  const thumbs = files.map(file => (
    <div key={file.name} className="bg-gradient-to-b from-babyblue via-pink-400 to-white rounded-lg flex flex-col items-center py-4 px-5 font-lato shadow-md">
      <h1 className="font-bold text-2xl text-white">Model Prediction</h1>
      <div className="px-2 py-8">
        <Image
          src={file.preview}
          alt="preview of uploaded images"
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
          width={200}
          height={200}
          className="drop-shadow-md rounded-3xl boder-2 border-white shadow-lg transition  hover:translate-y-1 hover:rotate-3 cursor-pointer"
        />
      </div>

      <hr className="border-2 border-dashed border-white border-opacity-50" />

      <div className="px-4 py-8">
        <div className="flex px-3 py-1 w-full font-karla">
          <div className="pr-2 my-auto flex align-middle">
            {file.gender == 'Male' && (
              <FontAwesomeIcon icon={faMars} size="1x" className="drop-shadow-md bg-blue-400 text-white px-4 py-4 rounded-full" />
            )}
            {file.gender == 'Female' && (
              <FontAwesomeIcon icon={faMars} size="1x" className="drop-shadow-md bg-pink-400 text-white px-4 py-4 rounded-full" />
            )}
          </div>
          <div className="my-auto py-2px-4">
            <p className="font-bold">
              {file.gender}
            </p>
            <em>
              {(file.confidence * 100).toFixed(2)}%
            </em>
          </div>
        </div>
        <p className="font-karla px-5 py-2">Inference Durations: {file.inferenceDuration.toFixed(2)} seconds</p>
      </div>
    </div>
  ));

  useEffect(() => {

    const loadModel = async function () {
      const origin = window.location.origin
      try {


        await new Promise(resolve => setTimeout(resolve, 5000));

        const model = await tf.loadGraphModel(origin + `/inceptionResNetV2-iteration-3-js/model.json`);
        setModel(model)
      } catch (e) {
        console.log("ERROR LOADING TFJS", e)
      }
    }

    loadModel()
  }, []);

  function loadForm() {
    if (model == undefined || model == null) {
      return (
        <section className="md:px-28 px-4 py-14">
          <div {...getRootProps()} className="bg-babyblue border-[2px] border-blue-400 border-dashed px-20 py-20 md:w-2/4 mx-auto rounded-lg font-karla cursor-pointer">
            <div className="py-5">
              <p className="font-semibold text-center">Loading the model...</p>
            </div>
          </div>
        </section>
      )
    } else if (inputState == 'disabled') {
      return (
        <section className="md:px-28 px-4 py-14">
          <div {...getRootProps()} className="bg-babyblue border-[2px] border-blue-400 border-dashed px-20 py-20 md:w-2/4 mx-auto rounded-lg font-karla cursor-pointer">
            <div className="py-5">
              <p className="font-semibold text-center">Processing the request...</p>
            </div>
          </div>
        </section>
      )
    }
    return (
      <section className="md:px-28 px-4 py-14">
        <div {...getRootProps()} className="bg-babyblue border-[2px] border-blue-400 border-dashed px-20 py-20 md:w-2/4 mx-auto rounded-lg font-karla cursor-pointer">
          <div className="py-2 mx-auto text-white text-center">
            <FontAwesomeIcon icon={faCloudUpload} size="4x" className="drop-shadow-md" />
          </div>
          <input {...getInputProps()} type="file" disabled={inputState == 'disabled'} />
          <div className="py-5">
            <p className="font-semibold">Ready for a challenge? Give our system a whirl by dragging and dropping your files here, or simply click to select them.</p>
            <em>(Keep in mind, you can drop up to five files maximum. Let&lsquo;s see what you&lsquo;ve got!)</em>
          </div>
        </div>
        <div className="md:px-20 px-2 py-20 grid grid-cols-1 md:grid-cols-5 gap-4">
          {thumbs}
        </div>
      </section>
    )
  }

  async function prediction(file: File): Promise<PredictionResult> {
    if (inputState == 'disabled') {
      return {} as PredictionResult
    }

    console.log("Starting predictions...")

    setInputState('disabled')

    let predictionResult = {} as PredictionResult
    try {
      if (model) {
        const image = await loadImage(file);
        const tensor = preprocessImage(image);

        const startTime = performance.now();
        const prediction = model.predict(tensor) as tf.Tensor;
        const result = await prediction.data()
        const endTime = performance.now();
        predictionResult.inferenceDuration = (endTime - startTime) / 1000;


        if (result[0] > 0.5) {
          predictionResult.gender = "Male"
          predictionResult.confidence = result[0]
        } else {
          predictionResult.gender = "Female"
          predictionResult.confidence = 1 - result[0]
        }


        console.log('Prediction:', result, result[0]);
        URL.revokeObjectURL(image.src);
      }
    } catch (e) {
      console.log("error predicting image", e)
    } finally {
      setInputState('available')
    }

    return predictionResult as PredictionResult
  }

  async function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = document.createElement('img') as HTMLImageElement;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Failed to load image.'));
        image.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  function preprocessImage(image: HTMLImageElement): tf.Tensor3D {
    const tensor = tf.browser.fromPixels(image)
      .resizeNearestNeighbor([178, 218])
      .toFloat()
      .div(255.0);

    const desiredShape: [number, number, number, number] = [-1, 178, 218, 3];

    return tf.cast(tensor, 'float32').reshape(desiredShape);
  }

  return (
    <main>
      <nav className="bg-gradient-to-r from-cream from-5% via-white to-cream flex items-center py-2 px-4 drop-shadow-sm shadow-sm sticky top-0 z-40">
        <div className="mx-auto px-1 py-1 cursor-pointer rounded-lg border border-babyblue">
          <a href="/"><Image src="/logo.webp" alt="logo of fagenre.insomnius.dev" width={120} height={120} /></a>
        </div>
      </nav>

      <div className="absolute filter  hidden md:block -z-[999] opacity-50 overflow-x-hidden overvlow-y-hidden h-[300px] w-[800px] top-[808px] blur-3xl" aria-hidden="true">
        <div className="absolute w-[789px] h-[789px] -z-[2002] left-[481px] bg-babyblue rounded-full">
        </div>
        <div className="absolute w-[789px] h-[789px] -z-[2001] left-[671.7px] bg-cream rounded-full">
        </div>
        <div className="absolute w-[789px] h-[789px] -z-[2000] left-[806.82px] bg-rose-quartz rounded-full">
        </div>
      </div>

      <section className="px-10 py-28 bg-gradient-to-b from-lilac via-rose-quartz from-5% to-95% to-cream relative">
        <div className="md:w-7/12 mx-auto space-y-5">
          <h1 className="font-extrabold text-4xl md:text-6xl font-lato text-white tracking-widest text-center">
            FACE GENDER  RECOGNITION
          </h1>
          <div className="bg-white rounded-xl py-5 px-1 space-y-5 items-center">
            <h2 className="text-center text-lilac font-lato tracking-wide md:text-xl">
              Guessing Games: Separating the <span className="font-bold">Adams</span> from the <span className="font-bold">Eves</span>, Like a Boss
            </h2>
            <p className="text-sm text-lilac w-10/12 mx-auto font-karla">
              Our AI model is primed and ready to take on the challenge of guessing your image with precision! If we hit the mark, it&apos;s a victory for us. Think you can outsmart our AI? Let&apos;s put its image-guessing skills to the test and see who comes out on top!
            </p>
          </div>
        </div>
      </section>

      {loadForm()}

      <footer className="w-full px-10 py-10 bg-white shadow-md grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-10 font-karla border-t border">
        <div>
          <h1>
            <a href="/" className="underline font-bold text-lg">INSOMNIUS.DEV</a>
          </h1>
          <h2>This is website is part of Muhammad Arief Rahman, portofolio.</h2>
        </div>
        <div>
          <h1 className="font-bold">My other sites</h1>
          <ul>
            <li>
              <a href="https://insomnius.id" className="underline">insomnius.id - my company</a>
            </li>
            <li>
              <a href="https://altair.codefluence.org" className="underline">altair - api gateway</a>
            </li>
            <li>
              <a href="https://coronator.insomnius.id" className="underline">coronator</a>
            </li>
          </ul>
          <div className="my-2"></div>
          <h1 className="font-bold">Navigations</h1>
          <ul>
            <li>
              <a href="/" className="underline">Home</a>
            </li>
            <li>
              <a href="/cv" className="underline">Download My Resume</a>
            </li>
            <li>
              <a href="/services" className="underline">Services</a>
            </li>
          </ul>
        </div>
        {model && (
          <div>
            <h1 className="font-bold">Connect with me</h1>
            <ul>
              <li>
                <span>
                  <svg className="svg-inline--fa fa-envelope" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path className="" fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
                  </svg>
                </span> email: <a href="mailto:awake@insomnius.dev" className="underline">awake@insomnius.dev</a>
              </li>
              <li>
                <span>
                  <svg className="svg-inline--fa fa-github" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path className="" fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                </span> github: <a href="https://github.com/insomnius" className="underline">insomnius</a>
              </li>
              <li>
                <span>
                  <svg className="svg-inline--fa fa-linkedin" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path className="" fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                  </svg>
                </span> linkedin: <a href="http://linkedin.com/in/insomnius" className="underline">Muhammad Arief Rahman</a>
              </li>
              <li>
                <span>
                  <svg className="svg-inline--fa fa-twitter" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path className="" fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </span> twitter: <a href="https://twitter.com/insomnius_" className="underline">insomnius_</a>
              </li>
              <li>
                <span>
                  <svg className="svg-inline--fa fa-medium" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="medium" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path className="" fill="currentColor" d="M180.5,74.262C80.813,74.262,0,155.633,0,256S80.819,437.738,180.5,437.738,361,356.373,361,256,280.191,74.262,180.5,74.262Zm288.25,10.646c-49.845,0-90.245,76.619-90.245,171.095s40.406,171.1,90.251,171.1,90.251-76.619,90.251-171.1H559C559,161.5,518.6,84.908,468.752,84.908Zm139.506,17.821c-17.526,0-31.735,68.628-31.735,153.274s14.2,153.274,31.735,153.274S640,340.631,640,256C640,171.351,625.785,102.729,608.258,102.729Z"></path>
                  </svg>
                </span> medium: <a href="https://medium.com/@insomnius-studio" className="underline">insomnius_</a>
              </li>
            </ul>
          </div>
        )}
      </footer>
    </main >
  );
}
