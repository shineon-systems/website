# Tree twin

<p id="date"><strong>24/01/2023</strong></p>
<p id="desc">TypeScript framework for remotely modelling and managing event-based control system networks as trees. 🌲</p>

![twin-tree-diagram](/public/articles/source/twin-tree/twin-tree.webp)

This is a core part of the Shineponics platform. It allows for the creation and management of in-memory digital twins of real sensor and control systems. 

Real-world sensors (systems) can transmit data to a web server using this technology where event-based relationships are set up between virtual systems to create control outputs that are sent back to real-world control systems. This allows a tomato to say "I'm too hot!" and a heater to go "okay, I'll shut down".

The reason it is called the "Tree twin" is that the systems are arranged in a tree data structure with parent and child nodes. Siblings cannot listen to each other, the intention is for parent control systems to listen to child sensor systems. This provides some rigidity to the relationships and stops to network from devolving into chaos.

The user interface will be built on top of it and digital twins of system relationships will need to be stored in-browser or in the cloud.

## [View on GitHub](https://github.com/shine-systems/tree-twin)

