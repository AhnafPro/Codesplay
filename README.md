# Codesplay
![codesplay (1)](https://github.com/user-attachments/assets/5bc71baa-8bd7-4057-869f-af990e9efe28)

##### Codesplay is a simple site that lets developers instantly turn raw code into clean, shareable snippets. Paste your code, pick a language, and get a beautifully highlighted preview you can download as an image or embed in your site.

###### How to use?
1. Enter your raw code into the input box on the left, under the code.txt window.
2. Choose the programming language, font size, and file name/title as you wish.
3. View and download the image of the snippet or copy the embed for your site.

###### Optimization
1. Lazy loading:
   - Changes: Load the script.js only after DOM Loads and loading attribute has been set to lazy for multiple tags and images ensuring slow yet smooth and quick loading of the page.
   - Reason for Changes: While the site loads at first, the js is usually not required and thus utilises lots of resource togather at once.
   - Proof: Before vs After
   <img width="480" height="21" alt="dombfore" src="https://github.com/user-attachments/assets/875d9e0d-3e0e-4709-bc34-ba840caca0cf" />
   <img width="480" height="22" alt="domafter" src="https://github.com/user-attachments/assets/54847a33-6179-42e2-98ea-700aa66b3c0f" />

2. Optimize asset size:
   - Changes: Many image based assets were changed to svg (no more than 2KB) and where ever png was required the file sizes were no more than 40KB. And CSS+JS were both minified as much as possible giving 13% and 24% compression on both files respectively.
   - Reason for Changes: To suit low profile devices, weak internet connection, quick asset loading and efficiency.
   - Proof:

     <img width="468" height="112" alt="SVG" src="https://github.com/user-attachments/assets/eba761d3-73d1-48dc-90fc-9978af50eb5f" />
