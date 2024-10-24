## Media optimization plugin:

I will be demo imagemin media optimization using the vite plugin imagemin.

Sample code

```jsx
imagemin({
            mode: 'sharp',
            compress: {
                jpg: {
                    quality: 10,
                },
                jpeg: {
                    quality: 10,
                },
                png: {
                    quality: 10,
                },
                webp: {
                    quality: 10,
                },
            }
        }),
```

- **`imagemin`**:
    - This is the main function from the `vite-plugin-imagemin` package.
    - It is used to configure how images in your project will be compressed during the build process.
- **`mode: 'sharp'`**:
    - This sets the image processing engine to `sharp`, a high-performance library for resizing and converting images.
    - Sharp is known for its speed and efficiency, making it a popular choice for handling image compression in modern web development.
- **`compress`**:
    - This section specifies how different image formats should be compressed.
    - Inside this object, each format (`jpg`, `jpeg`, `png`, `webp`) has its own compression settings.
- **`jpg`, `jpeg`, `png`, `webp`**:
    - These are image formats supported by the plugin and for which the compression is being configured.
    - Each format has a `quality` property, indicating the desired level of compression.
- **`quality: 10`**:
    - The quality setting for each image format, where `10` is the compression level.
    - In this case, `10` is a very low value, meaning the images will be heavily compressed, resulting in significantly smaller file sizes but potentially noticeable loss of quality. Quality values typically range from 0 to 100, with higher numbers representing better quality and larger file sizes.