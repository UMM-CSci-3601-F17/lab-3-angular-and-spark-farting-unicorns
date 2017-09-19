1) New ignores were added for gradle. There's one in the client module, 
one in the project overall, and one in the server module. There might 
be things the different modules want to ignore, and the server and 
client .gitignore's don't interact at all but the general .gitignore 
applies to both.

2) The reason for multiple build.gradle files is that each one contains it's
own tests that need to be run in that module.

3) It provides links to travel to different pages and it collapses. The 
server isn't the only thing that does routing.

4) user-list.service.ts requests from the server all users and users
by id provided by client. We COULD put what is in the service into the component file but it
would get long and components are more meant for looks and not logic
