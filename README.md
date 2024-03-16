- [Gender Face Recognition's Project](#gender-face-recognitions-project)
  - [Overview](#overview)
  - [Goals](#goals)
    - [Dataset](#dataset)
  - [Model Architecture](#model-architecture)
  - [Hardware Specifications](#hardware-specifications)
  - [Training](#training)
    - [Model Iteration #1](#model-iteration-1)
    - [Model Iteration #2](#model-iteration-2)
    - [Model Iteration #3](#model-iteration-3)
  - [Model Performance Analysis](#model-performance-analysis)
    - [VGG16](#vgg16)
    - [InceptionV3](#inceptionv3)
    - [InceptionResNetV2](#inceptionresnetv2)
  - [Summary](#summary)


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

### Dataset
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

### VGG16

**Model Iteration #1:**

- **Training Accuracy**: 90%
- **Training Loss**: 25%
- **Validation Accuracy**: 87%
- **Validation Loss**: 29%

![Performance Metric - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/6eb9a574-2269-4291-8dbf-61c4adf6b8f3)

![Confusion Matrix - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/4c0810e2-bac9-4b16-a829-647810c38b44)

**Model Iteration #2:**

- **Training Accuracy**: 92%
- **Training Loss**: 20%
- **Validation Accuracy**: 84%
- **Validation Loss**: 38%

![Performance Metric - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/56a3fd3d-ee48-43c7-89bc-190e275671cf)

![Confusion Matrix - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/a078a028-1157-41b8-ad0e-aa8855cb6bfd)

**Model Iteration #3:**

- **Training Accuracy**: 91%
- **Training Loss**: 23%
- **Validation Accuracy**: 89%
- **Validation Loss**: 30%

![Performance Metric - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/927cb055-817e-4fc6-a368-f3bfdafa2bed)

![Confusion Matrix - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/366406d3-e45b-48d6-99a0-01cd74d6f21d)

### InceptionV3

**Model Iteration #1:**

- **Training Accuracy**: 92%
- **Training Loss**: 20%
- **Validation Accuracy**: 84%
- **Validation Loss**: 34%

![Performance Metric - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/0c6bbc8c-4855-429f-b247-2a6ed2c42192)

![Confusion Matrix - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/6e1f30f6-9b9f-49d9-9ff4-23c5721e1a22)

**Model Iteration #2:**

- **Training Accuracy**: 96%
- **Training Loss**: 11%
- **Validation Accuracy**: 86%
- **Validation Loss**: 48%

![Performance Metric - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/211bf14f-484a-4c22-9ba7-5bd49f322b84)

![Confusion Matrix - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/2a28089f-eb77-491a-ab01-fd1dbe184ef9)

**Model Iteration #3:**

- **Training Accuracy**: 96%
- **Training Loss**: 12%
- **Validation Accuracy**: 90%
- **Validation Loss**: 32%

![Performance Metric - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/33dd8af8-7be3-4788-99ef-4f27f85b7ddf)

![Confusion Matrix - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/0859a640-69aa-4c4f-898e-60987e8138c9)

### InceptionResNetV2

**Model Iteration #1:**

- **Training Accuracy**: 93%
- **Training Loss**: 19%
- **Validation Accuracy**: 88%
- **Validation Loss**: 36%

![Performance Metric - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/5fb4d1ef-ddb0-4b29-bb53-9641dfd45812)

![Confusion Matrix - Iteration 1](https://github.com/insomnius/gender-face-recognitions/assets/20650401/6be8244c-c036-4112-8136-376931323f11)

**Model Iteration #2:**

- **Training Accuracy**: 97%
- **Training Loss**: 9%
- **Validation Accuracy**: 91%
- **Validation Loss**: 33%

![Performance Metric - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/74cc6965-1475-49b3-9e9e-1fbfd7a18206)

![Confusion Matrix - Iteration 2](https://github.com/insomnius/gender-face-recognitions/assets/20650401/03bb17c8-d47d-43a9-a72c-3e16f812d713)

**Model Iteration #3:**

- **Training Accuracy**: 95%
- **Training Loss**: 13%
- **Validation Accuracy**: 90%
- **Validation Loss**: 29%

![Performance Metric - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/1293eb62-6d2a-494f-8c2e-3aac14acf140)

![Confusion Matrix - Iteration 3](https://github.com/insomnius/gender-face-recognitions/assets/20650401/4f765fc0-612a-477c-b28e-9199f0c4c445)

## Summary

Based on the evaluation results and considering the performance metrics, the chosen model for face gender recognition is **InceptionResNetV2** from iteration 3. Here's a summary of the reasons for selecting this model:

- **Test Accuracy**: Achieved an impressive accuracy of 93.70% on the test data, indicating robust performance in classifying gender from facial images.
- **Inference Time**: Exhibited reasonable inference time of approximately 8.92 seconds, ensuring efficient real-time processing of face gender recognition tasks.
- **Consistent Performance**: Demonstrated consistent performance across different iterations, with high accuracy and relatively low loss values.
- **Training Efficiency**: Achieved a training accuracy of 95% with a training loss of 13%, indicating effective learning from the training data.
- **Validation Accuracy and Loss**: Maintained high validation accuracy (90%) with a relatively low validation loss (29%), indicating good generalization ability.

Overall, the InceptionResNetV2 model from iteration 3 offers a balance between accuracy, efficiency, and generalization performance, making it well-suited for practical deployment in face gender recognition applications.

Here's a summarized comparison of the performance metrics across different iterations of each model:

| Model                  | Test Accuracy | Inference Time (seconds) | Training Accuracy | Training Loss | Validation Accuracy | Validation Loss |
| ---------------------- | ------------- | ------------------------ | ----------------- | ------------- | ------------------- | --------------- |
| VGG16                  |               |                          |                   |               |                     |                 |
| - Iteration 1          | 76.90%        | 6.88                     | 90%               | 25%           | 87%                 | 29%             |
| - Iteration 2          | 84.40%        | 6.89                     | 92%               | 20%           | 84%                 | 38%             |
| - Iteration 3          | 85.30%        | 7.14                     | 91%               | 23%           | 89%                 | 30%             |
| InceptionV3            |               |                          |                   |               |                     |                 |
| - Iteration 1          | 89.70%        | 7.43                     | 92%               | 20%           | 84%                 | 34%             |
| - Iteration 2          | 88.00%        | 7.54                     | 96%               | 11%           | 86%                 | 48%             |
| - Iteration 3          | 90.10%        | 7.66                     | 96%               | 12%           | 90%                 | 32%             |
| InceptionResNetV2      |               |                          |                   |               |                     |                 |
| - Iteration 1          | 90.00%        | 9.08                     | 93%               | 19%           | 88%                 | 36%             |
| - Iteration 2          | 88.40%        | 9.08                     | 97%               | 9%            | 91%                 | 33%             |
| - Iteration 3 (Chosen) | 93.70%        | 8.92                     | 95%               | 13%           | 90%                 | 29%             |

InceptionResNetV2 from iteration 3 stands out with the highest test accuracy among all models and iterations, coupled with efficient inference time and consistent performance in training and validation. Hence, it is selected as the final model for face gender recognition.