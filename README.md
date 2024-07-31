# NFC App | TooLog 

![app](https://github.com/user-attachments/assets/73525dae-92df-4a76-991f-b7573fbe1211)


## Overview

This is a simple NFC app built using React Native Expo and TypeScript. ToolLog aims to streamline tool management on construction sites by leveraging NFC technology. It helps construction workers and managers keep track of their tools, reducing the chances of loss or misplacement. The app is built using React Native, making it compatible with both iOS and Android devices.

## Features
- **Tool Identification**: Read tool information from NFC tags.
- **Tool Management**: Write tool information to NFC tags.
- **Tool Inventory**: Maintain a digital inventory of all tools.
- **Search and Sort**: Easily find tools in the inventory.

## Setup Instructions

### Prerequisites
- **Node Js & npm/yarn**: Ensure you have Node.js and npm/yarn installed.
- **Android Studio**: You will need android studio, since it contains some native packages.

### Installation

1. Clone the repository:

    ```bash   
    git clone https://github.com/yourusername/ToolLog.git
    
    cd ToolLog
    ```


2. Install dependencies:

    ```bash
    npm install
    
    yarn install  
    ```

3. Start the Expo development server (Prebuild):

    ```bash
    npx expo prebuild --platform android
    
    npx expo run:android
    ```
    
4. Open the app in an emulator.


## Building the Android App

1. Login to Expo account:

    ```bash
    eas login
    ```

2. Configure EAS for your project:

    ```bash
    eas build:configure
    ```

3. Build the Android app:

    ```bash
    eas build --platform android --profile development --local
    ```
    
## Downlaod the apk File

   ```bash
   link to the apk doc
   ```

## ScreenShots


