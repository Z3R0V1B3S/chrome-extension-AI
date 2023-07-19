# AI CHROME EXTENSION

### This extension is the result of an experimental journey, where I started by testing ChatGPT and requesting it to create an AI-powered Chrome extension. Through some iterations and tweaks, this project emerged, though it may still be a work in progress.

##### 

 _While this project is born out of a playful exploration, it continues to evolve, and your contributions and feedback are most welcome.<br>
 **Join** the **fun** and let's make this **AI Chrome Extension** even more amazing together!_

 <br>

 ## **Features**
  The **AI Chrome Extension** brings a powerful and intelligent assistant to your browser, offering an array of features designed to enhance your browsing experience. With modes like Default Mode, Summarize Mode, and Grammar Correction Mode, you can effortlessly obtain answers, generate concise summaries, and improve the grammar of your written content. Additionally, the extension includes a handy Notes feature for personal reminders and offers customizable themes to suit your preferences.
 
 <br>
 
 - **Default Mode**: The AI assistant is available to answer a wide range of questions and provide information on various topics. It utilizes advanced natural language processing to deliver accurate and helpful responses.

 - **Summarize Mode**: This mode allows you to summarize any text you write or paste. Whether it's a lengthy article, a research paper, or even a paragraph, the AI assistant will condense the content into a concise summary, making it easier for you to grasp the main points quickly.

 - **Grammar Correction** Mode: The AI assistant acts as your personal proofreader. It analyzes the text you write or paste, identifies grammatical errors, and suggests corrections to improve the overall grammar and readability of your content.

 - **Notes**: The "Notes" feature provides a space to write and store personal reminders or important information.

 - **Themes**: Customize the extension with 4 different themes to personalize your experience.

   <br>

## **Prerequisites**

#### Before you can start using the AI Chrome Extension, ensure that you have the following:

 - Clone this repository to your local machine or download the source code as a **ZIP** file.
 - Open Google Chrome and go to **chrome://extensions**.
 - Enable the "Developer mode" toggle at the top right corner.
 - Click on the "Load unpacked" button and select the directory where you cloned or extracted the extension files.
 - The AI Chrome Extension will be installed and ready to use.

<br>

## **Configuration**
#### After installing the extension, you need to obtain an API key from OpenAI. Follow these steps to configure the extension:

1. Visit the OpenAI website at https://openai.com/ and sign up for an account if you haven't already.
2. Once you have an account, navigate to the API key management section.
3. Generate a new API key for your application or project.


#### Configure the extension with your API key:

4. Open the popup.js file in a code editor of your choice and navigate to line 121.
5. Copy the following code snippet and replace the existing line 121 with it:

 ```bash
 request.setRequestHeader("Authorization", "Bearer <!--YOUR-API-KEY-->");
```

6. Replace `<YOUR-API-KEY>` with your API key obtained from OpenAI.
7. Save the changes.

   <br>

## Usage
 #### Once the extension is installed, configured, and the API key is set, you can enjoy its powerful features:

 <br>

- **Default Mode**: Simply type your questions or queries into the extension interface, and the AI assistant will provide helpful answers and information.

- **Summarize Mode**: To summarize a piece of text, paste it into the extension interface or type it directly. The AI assistant will generate a concise summary of the content.

- **Grammar Correction Mode**: Whenever you want to check and correct the grammar of a text, whether it's an email, a blog post, or any other written content, paste it into the extension interface. The AI assistant will analyze the text and suggest improvements for grammar and readability.

- **Notes**: Use the "Notes" section to write down reminders, important information, or personal notes.<br>
  _Exercise caution while pasting sensitive information, as it will be stored in the application storage._

- **Themes**: Access the "Themes" menu to select your preferred theme. Choose from a selection of four themes, and the selected theme will be saved in the local storage.

<br>

Feel free to switch between modes based on your needs and explore the full capabilities of the AI Chrome Extension.

<br>

## Contributing
Contributions are always welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request to contribute to the development of the AI Chrome Extension.

<br> 

## License
The AI Chrome Extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
