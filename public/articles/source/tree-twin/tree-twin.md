# Tree twin

<p id="date"><strong>24/01/2023</strong> (Editted 07/08/23)</p>
<p id="desc">TypeScript framework for remotely modelling and managing event-based control system networks as trees. 🌲</p>

![twin-tree-diagram](/public/articles/source/tree-twin/tree-twin.webp)

An experimental technology allowing developers to create digital twins of sensor and control systems. 

Real-world sensors would transmit data to a web server that implements this technology. Event-based relationships are set up between the virtual devices on the server to compute control actions that are sent back to the real-world devices. This allows a tomato to say "I'm too hot!" and a heater to go "okay, I'll shut down".

The reason it is called the "Tree twin" is that the systems are arranged in a tree data structure with parent and child nodes. Siblings cannot listen to each other, the intention is for parent control systems to listen to child sensor systems. This provides some rigidity to the relationships and stops to network from devolving into chaos.

A user interface could be built on top of it and digital twins of system relationships would need to be stored in-browser or in the cloud. At the moment this project is not in use. Currently, systems are processed in a simpler fashion, without the need for trees. But the tree twin remains and interesting experiment and something to potentially come back to.

## [View on GitHub](https://github.com/shine-systems/tree-twin)

