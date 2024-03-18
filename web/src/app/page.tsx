'use client'

import Image from "next/image";
import { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function Home() {

  useEffect(() => {
    const origin = window.location.origin
    console.log()
  }, []);

  return (
    <main>
      <nav className="bg-gradient-to-r from-cream from-5% via-white to-cream flex items-center py-2 px-4 drop-shadow-sm shadow-sm sticky top">
        <div className="mx-auto px-1 py-1 cursor-pointer rounded-lg border border-babyblue hover:bg-blue-200">
          <a href="/"><Image src="/logo.webp" alt="logo of fagenre.insomnius.dev" width={120} height={120} /></a>
        </div>
      </nav>

      <section className="px-10 py-28 bg-gradient-to-r from-lilac via-rose-quartz from-5% to-95% to-cream relative">
        <div className="md:w-7/12 mx-auto space-y-5">
          <h1 className="font-extrabold text-4xl md:text-6xl font-lato text-white tracking-widest text-center">
            FACE GENDER  RECOGNITION
          </h1>
          <div className="bg-white rounded-xl py-5 px-1 space-y-5 items-center">
            <h2 className="text-center text-lilac font-lato tracking-wide md:text-xl">
              Guessing Games: Separating the <span className="font-bold">Adams</span> from the <span className="font-bold">Eves</span>, Like a Boss
            </h2>
            <p className="text-sm text-lilac w-10/12 mx-auto">
              Our AI model is primed and ready to take on the challenge of guessing your image with precision! If we hit the mark, it&apos;s a victory for us. Think you can outsmart our AI? Let&apos;s put its image-guessing skills to the test and see who comes out on top!
            </p>
          </div>
        </div>
      </section>
    </main >
  );
}
