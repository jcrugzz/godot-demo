# godot-demo

So this is the demo that I will be giving for the nodejs meetup this Wednesday.
Now this demo will be done completely from scratch during the presentation, this
is the basic outline.

I will give my slides, go through why monitoring is important, explain a couple
real world examples of how we use a monitoring solution and convey the value
proposition overall.

Second I will ask the audience if they are familiar with streams in node.js that
will lead into my example of building the http server that you see in this repo.
I show how requests and responses are just streams and how we can interleave
them with the magical pipe function.

Thirdly I will describe Godot, its components and give an idea of how it can
integrate into yours system. I will then get into a live demo where I compose
a simple realistic architecture that shows how you can easily monitor solution using
these simple stream primitives.

## Flow of demo

Build out the proxy that we will sit in front of the http server and add some
simple logging. Make requests to the proxy and show how we can get some useful
information in our logs as logs are the first layer of monitoring.

Once we are getting logs from both the http servers and the proxy, we propose
the question of what if we need to scale the application? What if we want all of
this in once place? Specifically for logs there are services like loggly and
papertrail but if we want our proxy to be performant, we can't afford to be
opening up a bunch of http sockets. While we could use something like syslogd if
we are dealng with more than just logs, godot is much more flexible way to handle this.

Now we have already shown that we can get response time from the application,
but what can we do with this information? This is actually a piece of data we
can use to gain insight into the performance of our HTTP servers. In order to
get any insight into how well our service is performing, we need to calculate
the time it takes for a user's request to be handled, or maybe how long
a database query takes. In our case here, the performance of a particular
endpoint can easily be calculated by the time it takes to proxy a request and
using `godot` we can calculate the average and even make decisions based on this
number!

*notes*

The basic idea is that I will continue to build on this concept with various
metrics, show it in action and I will have a picture of an architectural diagram
to show at the end to try and bring it all in.

I am still messing around with my slides (perfectionist in me) and I may
switch around the metrics if I figure out something simple and more powerful to
convey. I thought this covered most of the important bits so I'd love any and
all feedback you could give me!

Cheers,
Jarrett
