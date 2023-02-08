# "Better" tech

<p id="date"><strong>07/02/2023</strong></p>
<p id="desc">What is the tech behind Shineponics? Is it ethical?</p>

![why-shine](/news/articles/why-shine/noun-light-bulb-58666.png)

<hr>

## "Green" tech 

**Warning: This article gets technical**

First of all, no tech is green. Some unfortuante truths of the world we live are that most raw materials are unsustainably extracted from foreign lands, labour is usually paid the bare minimum and even if your energy supplier is "green", the wider economy in which you both operate is not.

As a technophile I am obviously not going to campaign for the abandonment of all tech but it is important to realise that, at present, we are currently building on borrowed time. This is a big part of the motivation behind Shineponics!

## Cloud

Now, accepting that we can only make "better" decisions, let's explore some of the decisions made at Shineponics. First of all, Shineponics uses Deno Deploy for cloud infrastructure. Deno Deploy is the commercial cloud infrastructure built around the Deno JavaScript engine. Both the Deno engine and the JavaScript language itself are open-source technologies, wahoo! 

Deno Deploy supports many standardised web platform APIs and encourages their use, this is another step towards community ownership that I greatly appreciate and it reduces vendor lock-in, a tactic used by organisations like Apple, Amazon and Microsoft. Deno Deploy also uses Google Cloud Platform under-the-hood which in 2021 powered datacenters with 61% renewable energy, a step in the right direction.

## Data

Another hot topic in the tech world is data protection. Platforms like Facebook and Google capitalised off of user data for far too long before regulation started to come into play. Most users still don't have an understanding of what they are giving away when signing up to platforms and telling them to read pages of "terms and conditions" is simply not an ethical solution.

Shineponics understands what Ben Parker meant when he said "...with great power, comes great responsibility." As developers of community technology we have a responsibility to protect them. You may notice that you have not clicked a cookie notice on this site. Why? Because we don't use cookies! We do anonymously track things like request times, rough geographic area, language choices etc as a means to improve our services but we don't pretend we need your personal information to do that.

We also build all of our systems to support user-owned data first and cloud data storage second. A Shineponics application will only store data locally within your browser by default, giving you complete control of what we know about you. Want to clear the data? Just clear the browser storage. If you want to persist your data on the cloud and share it across multiple devices that is done at your discretion. 

## Energy

A secondary benefit to our local-data-first approach is that our software uses less energy than other similar software because we simply interact with less stuff. Without as much databases reading and writing we send less data between data centers. On top of this we run all of our web applications on the serverless edge with Deno Deploy. This means we never maintain unused server infrastructure, we spin up code when its needed and let it die when its not. 

## Hardware

Shineponics hardware is a work in progress. We are currently experimenting with ESPHome boards and peripherals as they appear to be the best community-backed and open-source solution for low-cost IoT devices. However there is much more to investigate here. I hope the decisions made in developing our software provide assurance that our hardware choices will be made with as much consideration towards our communities and environments as well.

Stay tuned for the next steps in our "better" direction. Goodbye for now!