- [Gender Face Recognition's Project](#gender-face-recognitions-project)
  - [Overview](#overview)
  - [Goals](#goals)
- [Model Development](#model-development)
  - [Dataset](#dataset)
  - [Model Architecture](#model-architecture)
  - [Hardware Specifications](#hardware-specifications)
  - [Training](#training)
    - [Model Iteration #1](#model-iteration-1)
    - [Model Iteration #2](#model-iteration-2)
    - [Model Iteration #3](#model-iteration-3)
  - [Model Performance Analysis](#model-performance-analysis)
    - [InceptionV3](#inceptionv3)
    - [InceptionResNetV2](#inceptionresnetv2)
    - [VGG16](#vgg16)
  - [Summary](#summary)
- [Model Deployment](#model-deployment)
  - [Model Conversion and Formats](#model-conversion-and-formats)


# Gender Face Recognition's Project

Author: [@insomnius](https://github.com/insomnius)

Created date: 2024-03-16

## Overview

**Face gender recognition** is a task in the field of computer vision and machine learning that involves identifying the gender of individuals based on images or videos of their faces. It is a subfield of facial recognition, which aims to detect and analyze facial features for various applications, including security, surveillance, marketing, and human-computer interaction.

## Goals

The primary goals of this project are as follows:
1. Develop and train a deep learning model for face gender recognition.
2. Evaluate the performance of the model on a subset of the CelebA dataset containing 5000 images.
3. Compare the performance of different model architectures and techniques for face gender recognition.
4. Explore potential real-world applications and implications of the developed model.

# Model Development

## Dataset
The CelebA dataset is a widely used benchmark dataset for face attribute analysis, including gender classification. It contains over 200,000 celebrity images annotated with various attributes, including gender.

For this project, a subset of the CelebA dataset consisting of 5000 images has been utilized. Each image has been preprocessed to ensure consistency in size and quality.

![Dataset Image Sample](https://github.com/insomnius/gender-face-recognitions/assets/20650401/3a37b3dc-15f3-4a5a-a111-f49281a74647)

## Model Architecture

Three different pre-trained convolutional neural network (CNN) architectures have been explored for face gender recognition:

1. **VGG16**: A widely used CNN architecture known for its simplicity and effectiveness.
2. **Inception v3**: A more complex CNN architecture designed to improve performance and efficiency.
3. **InceptionResNetV2**: A state-of-the-art CNN architecture that combines the Inception and ResNet modules for enhanced performance.

## Hardware Specifications

The following hardware configuration was utilized for model training and evaluation:

```
CPU Information:
Architecture: X86_64
Cores: 6
Threads: 12

Memory Information:
Total Memory: 29.38 GB
Available Memory: 26.58 GB

GPU Information:
GPU 1:
Name: NVIDIA GeForce RTX 3050
Memory Total: 8192.00 MB
Memory Used: 916.00 MB
Memory Free: 7140.00 MB
Utilization: 10.00%
```

## Training
Each model was trained using a combination of supervised learning techniques and transfer learning. The following iterations were conducted for model training:

### Model Iteration #1
- **Parameters**:
  - Batch size: 64
  - Seed: 1024
  - Target Size: (128, 128)
  - Validation datasets size: 20%
  - Data test size: 20%
  - Additional fully connected layer: Global Conv 2d, Relu, Sigmoid
  - Epoch: 20
  - Optimizers: Adam
  - Pre-trained data: ImageNet
  - Loss function: Binary Cross Entropy
  - Layer freeze: True
  - Model input shape: (128, 128, 3)

### Model Iteration #2
- **Parameters**:
  - Batch size: 64
  - Seed: 1024
  - Target Size: (128, 128)
  - Validation datasets size: 20%
  - Data test size: 20%
  - Additional fully connected layer: Global Conv 2d, Relu, Sigmoid
  - Epoch: 50
  - Optimizers: Adam
  - Pre-trained data: ImageNet
  - Loss function: Binary Cross Entropy
  - Layer freeze: True
  - Model input shape: (128, 128, 3)

### Model Iteration #3
- **Parameters**:
  - Batch size: 64
  - Seed: 1024
  - Target Size: (178, 218)
  - Validation datasets size: 20%
  - Data test size: 20%
  - Additional fully connected layer: Global Conv 2d, Relu, Sigmoid
  - Epoch: 20
  - Optimizers: Adam
  - Pre-trained data: ImageNet
  - Loss function: Binary Cross Entropy
  - Layer freeze: True
  - Model input shape: Default per model

## Model Performance Analysis

### InceptionV3

**Model Iteration #1:**

- **Training Accuracy**: 0.916015625
- **Validation Accuracy**: 0.8374999761581421
- **Training Loss**: 0.21344590187072754
- **Validation Loss**: 0.21344590187072754

![Performance Metric - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/8e7c376d-ba5b-4bab-9b4d-2150c4f1be09)

![Confusion Matrix - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/0dba68c7-3516-4fd0-b617-44dae3dc63f5)

**Model Iteration #2:**

- **Training Accuracy**: 0.952343761920929
- **Validation Accuracy**: 0.8999999761581421
- **Training Loss**: 0.11500058323144913
- **Validation Loss**: 0.11500058323144913

![Performance Metric - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/1cf5eba6-6bc1-4a39-8a93-f2372a4cb943)

![Confusion Matrix - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/85f67ee9-27b1-4ee0-8526-0d2c1d1f7668)

**Model Iteration #3:**

- **Training Accuracy**: 0.958984375
- **Validation Accuracy**: 0.9125000238418579
- **Training Loss**: 0.10248909890651703
- **Validation Loss**: 0.10248909890651703

![Performance Metric - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/6547dd56-0df3-439d-8e0d-b609d7ed5ab3)

![Confusion Matrix - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/55f441fa-46ba-4db0-af36-50765ab8a7e4)

### InceptionResNetV2

**Model Iteration #1:**

- **Training Accuracy**: 0.934765636920929
- **Validation Accuracy**: 0.893750011920929
- **Training Loss**: 0.16316057741641998
- **Validation Loss**: 0.16316057741641998

![Performance Metric - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/b04fd800-86cf-49c2-aa5d-8d57f6b4280c)

![Confusion Matrix - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/cf8b920a-9787-4115-982a-96390d58f7a3)

**Model Iteration #2:**

- **Training Accuracy**: 0.961718738079071%
- **Validation Accuracy**: 0.887499988079071%
- **Training Loss**: 0.0950295701622963%
- **Validation Loss**: 0.0950295701622963%

![Performance Metric - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/579b28d8-c83a-4d61-b05a-bf5ab6f70864)

![Confusion Matrix - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/d3515d75-3e22-4409-a94a-3b131ec69cdb)

**Model Iteration #3:**

- **Training Accuracy**: 0.951171875
- **Validation Accuracy**: 0.893750011920929
- **Training Loss**: 0.11946799606084824
- **Validation Loss**: 0.11946799606084824

![Performance Metric - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/dff36da4-9f27-41b0-b0a9-9678f8817e86)

![Confusion Matrix - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/681427d3-107a-402f-a871-69e1fd6d46eb)

### VGG16

**Model Iteration #1:**

- **Training Accuracy**: 0.8980468511581421
- **Validation Accuracy**: 0.862500011920929
- **Training Loss**: 0.25405630469322205
- **Validation Loss**: 0.25405630469322205

![Performance Metric - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/5be59f14-e802-4b09-b9c7-e9bbbba6c881)

![Confusion Matrix - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/a6f1717a-0413-452c-a915-5911e3de70ef)

**Model Iteration #2:**

- **Training Accuracy**: 0.9097656011581421
- **Validation Accuracy**: 0.875
- **Training Loss**: 0.2175092250108719
- **Validation Loss**: 0.2175092250108719

![Performance Metric - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/5348dfa0-2e98-4008-a5b0-9843b92e47f7)

![Confusion Matrix - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/505a4924-7ae6-42c7-a2ca-37fc89666335)

**Model Iteration #3:**

- **Training Accuracy**: 0.904296875
- **Validation Accuracy**: 0.862500011920929
- **Training Loss**: 0.2247992753982544
- **Validation Loss**: 0.2247992753982544

![Performance Metric - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/d84a291d-e5e3-4c20-9d93-9e52a271e67f)

![Confusion Matrix - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/ebd6c65c-2901-4f77-87ff-de8e0955621f)

## Summary

Based on the evaluation results and considering the performance metrics, the chosen model for face gender recognition is **InceptionResNetV2** from iteration 3. Here's a summary of the reasons for selecting this model:

- **Test Accuracy**: Achieved an impressive accuracy of 93.70% on the test data, indicating robust performance in classifying gender from facial images.
- **Inference Time**: Exhibited reasonable inference time of approximately 8.92 seconds, ensuring efficient real-time processing of face gender recognition tasks.
- **Consistent Performance**: Demonstrated consistent performance across different iterations, with high accuracy and relatively low loss values.
- **Training Efficiency**: Achieved a training accuracy of 95% with a training loss of 13%, indicating effective learning from the training data.
- **Validation Accuracy and Loss**: Maintained high validation accuracy (90%) with a relatively low validation loss (29%), indicating good generalization ability.

Overall, the InceptionResNetV2 model from iteration 3 offers a balance between accuracy, efficiency, and generalization performance, making it well-suited for practical deployment in face gender recognition applications.

Here's a summarized comparison of the performance metrics across different iterations of each model:

| Model             | Test Accuracy | Test Loss | Inference Time (seconds) | Training Accuracy  | Training Loss       | Validation Accuracy | Validation Loss     |
| ----------------- | ------------- | --------- | ------------------------ | ------------------ | ------------------- | ------------------- | ------------------- |
| InceptionV3       |               |           |                          |                    |                     |                     |                     |
| - Iteration 1     | 0.863         | 0.336     | 0.730                    | 0.916015625        | 0.21344590187072754 | 0.8374999761581421  | 0.21344590187072754 |
| - Iteration 2     | 0.864         | 0.396     | 0.814                    | 0.952343761920929  | 0.11500058323144913 | 0.8999999761581421  | 0.11500058323144913 |
| - Iteration 3     | 0.916         | 0.242     | 1.301                    | 0.958984375        | 0.10248909890651703 | 0.9125000238418579  | 0.10248909890651703 |
| InceptionResNetV2 |               |           |                          |                    |                     |                     |                     |
| - Iteration 1     | 0.903         | 0.280     | 1.848                    | 0.934765636920929  | 0.16316057741641998 | 0.893750011920929   | 0.16316057741641998 |
| - Iteration 2     | 0.884         | 0.341     | 1.822                    | 0.961718738079071  | 0.0950295701622963% | 0.887499988079071%  | 0.0950295701622963% |
| - Iteration 3     | 0.927         | 0.175     | 2.878                    | 0.951171875        | 0.11946799606084824 | 0.893750011920929   | 0.11946799606084824 |
| VGG16             |               |           |                          |                    |                     |                     |                     |
| - Iteration 1     | 0.901         | 0.260     | 1.143                    | 0.8980468511581421 | 0.25405630469322205 | 0.862500011920929   | 0.25405630469322205 |
| - Iteration 2     | 0.897         | 0.255     | 1.140                    | 0.9097656011581421 | 0.2175092250108719  | 0.875               | 0.2175092250108719  |
| - Iteration 3     | 0.911         | 0.233     | 2.630                    | 0.904296875        | 0.2247992753982544  | 0.862500011920929   | 0.2247992753982544  |

InceptionResNetV2 from iteration 3 stands out with the highest test accuracy among all models and iterations, coupled with efficient inference time and consistent performance in training and validation. Hence, it is selected as the final model for face gender recognition.

**Test Accuracy**: It achieves the highest test accuracy among all models, with a value of 92.7%.

**Test Loss**: The test loss is the lowest among all models, indicating better performance in minimizing errors during testing.

**Inference Time**: Although it has the highest inference time among the listed models, at 2.878 seconds, it remains within a reasonable range for practical deployment.

**Training Accuracy and Loss**: The training accuracy and loss are within acceptable ranges, indicating effective learning from the training data.

**Validation Accuracy and Loss**: The validation accuracy and loss are also reasonable, demonstrating good generalization ability.

# Model Deployment

## Model Conversion and Formats

We're planning to launch our model using tensorflow.js, so it can run on the user's device. In order to do that we have to compile our model to tensorflow js format.

