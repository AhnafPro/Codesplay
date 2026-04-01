# Codesplay
![codesplay (1)](https://github.com/user-attachments/assets/5bc71baa-8bd7-4057-869f-af990e9efe28)

##### Codesplay is a simple site that lets developers instantly turn raw code into clean, shareable snippets. Paste your code, pick a language, and get a beautifully highlighted preview you can download as an image or embed in your site.

###### How to use?
1. Enter your raw code into the input box on the left, under the code.txt window.
1. Choose the programming language, font size, and file name/title as you wish.
1. View and download the image of the snippet or copy the embed for your site.

###### How was it optimized?
1. Loading="lazy" in the embed code of the snippet.
- Basically telling the browser to wait until the users have scrolled to a data.
2. Uses base64 encoding for self contained data URI.
- So there won't be any need for backend and site's domain dependency.
3. Uses SVG is mutiple places.
- SVG has much smaller file size and faster loading.
