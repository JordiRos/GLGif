GLGif
=====

Simple Three.js Gif loader, based on @thespite code and using shachaf's JSGif.

Using this snippet you can load all Gif frames in a THREE.Texture array, so you can draw any frame at any time, draw whole or part of a sequence with any speed, or reversed, whatever you think of, or access its pixels directly.

Loader has some issues and can't handle some of the Gif optimizations, it works better when Gif is not optimized and all frames are fully encoded.

Watch it live for a usage example, here Gif sequences are timed with BPM:

http://www.jordiros.me/glgifomatic/gangnam.html

http://www.jordiros.me/glgifomatic/napoleon.html