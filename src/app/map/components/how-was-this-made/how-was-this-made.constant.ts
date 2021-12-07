
export const ROW_OF_CONTENT = [
    'Introduction',
    'New Task',
    'Map Layout',
    'Elevations On The Terrain',
    'Implementing The Map',
    'Overcoming Limitations Of NgFor',
    'Solution To Performance Issue',
    'Positioning Endpoints And Path',
    'Animating The Shortest Path',
    'Rules Of The Map',
    'Floating Menu Bar',
    'User Experience',
    'Angular Animations',
    'Typewriter Effect'
]

export const HOW_I_MADE_THIS = [
    {
        titleIndex: 0,
        details: [
            'When in college, one of things that a student is expected to have are personal projects. So that the students have a way to materialize the knowledge gained and exhibit the skills they acquired. Even though I am not in college now, I am still a student. Even though I am working as a software engineer now,I still have a lot to learn. Thus, to keep learning, I decided to work on a personal project around my current domain of web development.',
            'The purpose of a personal project is not necessarily to tackle any world problem but to keep harboring the desire of doing something like that someday. So, instead of dawdling, thinking of some complex problem statement, I decided to keep it simple. I wanted a project where I can make mistakes, learn lessons, and explore web development with no commitment to others but myself.',
            'While I was thinking of that \'easy-peasy\' idea, I came across Clément Mihailescu\'s pathfinding project. Instantly, it seemed like a fun and appealing concept to try. But I wanted to make it a little more challenging, enough to not rely on his code when I come across any hiccups while completing the project. Around the same time I came across this LeetCode problem \'61. Minimum Path Sum\' which ended up giving me the idea that shaped my version of a path finding application, concluding my search for a problem statement.',
            'The biggest challenge when doing a personal project is there is no obligation for you to complete it. So the only way I could get through this was to develop discipline, practice patience and focus on the joy I get from exploring ideas that intrigue me. And while doing this, I learned more things to avoid than the things I needed to do. The below cards will take you through a little journey of me formulating the project idea and building an application from it.'
        ]
    },
    {
        titleIndex: 1,
        details: [
            'Whenever you start a new task, the first thing you do is refer to applications of people who have already done similar work before. Likewise, my obvious primary reference was Clément\'s project. I analyzed and compared his approach with ideas of my own that I had in mind for my version of the pathfinding project.',
            'I divided the project into a few sections for me to compare - the type of layout over which the path will be found, the dimension of the grid, the directions we could move when finding the shortest path, the way to provide action buttons for users to operate.'
        ]
    },
    {
        titleIndex: 2,
        details: [
            'The type of layout that anyone on the internet implemented was a simple two dimensional grid with square cells, some of which will be highlighted when becoming part of a path between a start and end point positioned somewhere on the grid. That layout worked for pathfinding projects in the context of helping someone to visualize how some path finding algorithms work.',
            'But I wanted something more for my version. Considering there are many similar pathfinding projects that visually explained how some algorithms work, I thought of shifting my focus to making my version look like a real-word application that someone would use, someone who would want to find the shortest path in a particular terrain.',
            'Evidently, the type of layout needed for my version was something that represented a terrain. Each cell of my grid could represent the smallest area a person could occupy when standing on a terrain or represent the smallest unit of coordinate in terms of map. The next question was which type of map is best suited to represent a terrain in my application? When walking through terrain in the real world, your movement is not restricted along a plane but also perpendicular to it. This meant, in my version, the cells of the matrix should not only represent position in a x-y plane but also altitude to position that point on a z-axis as well. So, the answer to the above question was to use a topographical map that would not only help show a scaled planar distance between points but also help visualize the change in elevation along the path. '
        ]
    },
    {
        titleIndex: 3,
        details: [
            'The change in elevation around the whole grid was something rarely found in most of the path finding projects I came across on the internet. So, this was something that was significantly unique to my personal project. That meant we had to consider one more factor in finding the shortest path, a new cost. Initially there is a cost involved when we move along a plane which is enough to find the shortest path on a plain terrain where there is no change in elevation. That is it was enough in most of the pathfinding projects on the internet. But here, since my version also included elevation, the cost to move up or down also plays a role in finding the shortest path.',
            'In a topographical map, change in elevation is represented by different colors. I similarly used twenty-five colors to represent a range of elevation on a generic scale. With this everything required for representing my map was there. I now needed to find a way to implement this map within the limitations of browser performance and accordingly find & animate the path on that map.'
        ]
    },
    {
        titleIndex: 4,
        details: [
            'Now with the setup of the elevation map in mind, I started my journey into experimenting how I can actually implement this into my project. The grid dimensions that were used in other projects were around 30x30 i.e around 900 cells. This was too low for me to achieve the desired look of a topographical map that someone would use to navigate through a terrain. I had to think of a big number for a more crisp map with smooth change in color representing change in elevation. So, I started with 1000 each side. The first approach that I thought of was to render the grid using Angular\’s structural directive - NgFor. It seemed simple, use nested *ngFor loop iterating over a two-dimensional matrix of objects holding values like their position and altitude. The values in objects will be used to assign respective colours representing certain altitudes on the map. And I, naively went ahead with it -  wrote code. served it on local. went on browser. and nothing. literally nothing. As swiftly I jumped on implementing the approach, with that same speed I bumped against the first wall of browser performance. The grid was not even rendering on the browser. This was one of the first significant roadblock that I faced when completing this project.',
            'After a lot of debugging and research and head scratching, I realized where I was going wrong. The execution of NgFor loop was quick but actual UI rendering was taking too long, making the initial load time extremely high. The performance efficiency dropped with increase in iteration count. Well In my case it was not just one loop but two nested ngFor loops. To confirm, I tried rendering the UI over a 30x30 matrix as opposed to 1000x1000 and observed that the initial load time drastically improved. But even when it was tempting to simply decrease the grid dimensions I decided to not compromise. To achieve the desired look of a topographical map, I had to at least push a little more, push to 100X100 at least. But when I tried with that count, it was still significantly slow.',
            'After further investigation, the other reason I found for this performance issue was because I was trying to achieve a depth in the map by making a cell at  higher elevation slightly overlap the one which is relatively lower to it. So, the cells were not just spread over a x-y plane but also arranged over the z-axis. To implement this effect each cell had to render at a z-index value assigned to the cell that was equal to one of the twenty-five elevation units along the z-axis. So when each cell rendered during ngFor loop, the browser had to rewrite the browser’s whole z-index stacking to make each cell fall into the correct position along the z-axis.',
            'I had to think of a way around this.'
        ]
    },
    {
        titleIndex: 5,
        details: [
            'Now knowing the limitations of ngFor loop in terms of  UI rendering performance, I had to understand other reasons why this approach mattered in the first place. There were two significant reasons, first they helped position start or end points and other they helped mark & animate cells that are part of the shortest path. With this approach, we could drag the  endpoints over the map with the help of simple mouse-enter and mouse-leave hooks, it was easier to identify which new cell was to mark as either start or end points. Whereas when it came to finding a path, it was more intuitive to mark a cell as part of a shortest path, instead of creating new cells on the top of those cells, something which I had to do later.',
            'The above points were a pretty good reason to push for NgFor and were also followed by other pathfinding projects on the internet to my knowledge. This meant there was nothing there on the internet to guide me with the issue I was facing. There was one Angular feature, \'trackBy\' function that helped improve efficiency when any data was changed in the matrix but did nothing for the long initial load time.',
            'To give a fair idea of the issue with initial load time, according to one of the article on internet the ideal initial load time for a website should be below 2s after which the users visiting the website tend to leave. Well in my case, for a 180x720 map, the initial load time was not nothing around 2s, not even 5s or 10s but whopping 20s.',
            'Now bringing the 20s initial load time down to one tenth that is 2s felt far fetched, forcing me to almost give up the idea of topographical look for the application. But the aim was to make something unique instead of doing what others did. So I, with the risk of losing time to a dead end, decided to stick with the 180x720 dimensions of the matrix/map. With that decision, I had no other option but to further bang head for some other solution',
            'I tried different iterations of the way the data was fed to the NgFor loop. After some couple of attempts I was at least able to skip the z-index stacking rewrite, bringing down the initial load time significantly; but still not to an acceptable point. After two months of various attempts, I observed something obvious which subsequently gave me an idea for an alternative to NgFor. What I observed was that the map is something that is not going to change once it\'s loaded. The number of nodes or positions are going to remain the same including their respective altitude. Some of the nodes will be marked as part of the path but that doesn\'t really change any characteristics of the original map. Therefore using NgFor would be an overkill since using it would make sense when there are significant changes in characteristics of any node or cell. So, basically what was needed to show the map was something like an image which would bring down the initial load time of the map significantly.'
        ]
    },
    {
        titleIndex: 6,
        details: [
            'An image, a static file, was the best way to represent the map. It solved the browser performance issue of high initial load time, bringing down the time to load by around 100%. One way to build that image was to use some image editing software and add altitude color one by one to their correct position as planned in the matrix and likewise build the whole map. To improve on that, we could build it into svg instead so the application can increase and decrease the map size to fit the desktop screen without losing the quality or crispiness of change in color on the map. But I thought to avoid the svg format or any image editing software to build some png image and decided to stick with web development tools i.e. Angular to develop that image.',
            'The best way to build an image in my case is using HTML canvas. I had to build the map just once by looping over the matrix representation of the map and then store the base64 url of the image generated in a file. Later that image of the map will be loaded using HTML canvas.',
            'Since the code was not looping over any matrix for every load, the initial load time significantly dropped, coming down from initial 20s to pretty much below 1s.'
        ]
    },
    {
        titleIndex: 7,
        details: [
            'After building the map in the image format, the next consecutive thing was to compensate for the pros of NgFor i.e. positioning start and end points and animating shortest path. This is where absolute positioning comes into picture. To position a node over the map, the code required to know the height below the top of the map and width from the left side of the map. We could find that from knowing and accordingly maintaining the length of a single cell and the index of the cell in the matrix which is marked as either start or end point. With help of those two parameters, we will then calculate the distance from top and left of the desktop screen and accordingly display an endpoint icon over the map image.',
            'Similarly, for the shortest path, we needed to mark the cells in the matrix that are part of the shortest path and accordingly position each node of the path using the index. All the shortest cells will be rendered over the map with the help of a simple single NgFor loop. The cells that are part of the shortest path will be found using one of the famous algorithms - Dijkstra\'s shortest path algorithm.'
        ]
    },
    {
        titleIndex: 8,
        details: [
            'After executing the dijkstra\'s algorithm, of all the cells in the matrix or map, some of them will be selected and pushed into an array which represents the list of nodes that are part of the shortest path. When I was going with the NgFor loop approach for the map, the way I was animating the shortest path was by using an in-built function called setTimeout inside the for loop that was looping that shortest path array. This way, the selected cells will change color one by one with some few milliseconds of time difference between them. And we would see an effect of the path getting created from the start point and finding its way to the end point.',
            'But there were two problems with this approach. One being that, once the animation for shortest path was initiated we couldn\'t stop it. The whole animation had to be completed before we could change the position of start and end point or perform any other actions. This was because we can\'t stop the for loop execution on demand. The other problem with this approach was, as mentioned on the above cards, is that we scrapped the idea of using the NgFor loop approach for rendering the map, so marking the cells one by one with the help of a for loop was not feasible.',
            'The solutions to these problems were quite easy to think of compared to challenges that I faced rendering the map on UI. For the former one of the two problems, instead of using setTimeout I used css animation with necessary delay to create the effect of path building towards the end point. The first node or cell of the shortest path will appear the earliest while the second will appear after a few milliseconds and after that the third one and so on. With this, not only was I able to stop the path animation whenever I wanted but also had more control over the speed of animation. Whereas for the later problem, I just had to create new nodes over the map and position them absolutely, instead of changing the color of existing nodes on the map, which would anyway be impossible since we were loading the map as an image.'
        ]
    },
    {
        titleIndex: 9,
        details: [
            'Now that the challenges around animating the path was resolved, I had to establish the rules to find the path over the map. I assigned one unit of cost to move from one cell to another along the plane of the map and the cost of one unit to move from one cell at an elevation point to adjacent elevation point, above or below. When finding the next best cell to move to, when finding the shortest route, there will be six candidates - top, bottom, left, right and four diagonally cells in between those four.', 
            'With the above rules, the dijkstra\'s algorithm was working as expected, except for one thing. Since as per the rule we were allowing movement in six directions contrary to the popular four direction movement, for some of the start and end points arrangements, the path was a little less intuitive to look at. It was forming a path in an angle i.e with one unnecessary turn where a straight line path could have worked. This was replicable, especially an area on the map where the start and endpoint were along the same elevation including the cells along the straight line passing through start and endpoint.',
            'Though those paths were theoretically correct solutions but they seemed broken to look at. To resolve this I made changes to how dijikstra\'s algorithm chooses neighbouring cells that would lead to a more intuitive path. I introduced a turn cost.',
            'When the algorithm is finding the path, if there is a turn i.e a change in direction a cost will be associated with it. So that the cost to make a turn would be relatively more than moving ahead in the original direction. Therefore, the algorithm would choose a straight path wherever necessary instead of a path with an unnecessary turn.',
            'The value of this turn cost needed to be negligible compared to the base cost of one unit or else the algorithm would never take a turn and in a probable worst case, the path would never lead to the end point. Basically it meant, the sum of the turn cost from all the possible turns in an imaginary long path should not be more than the basic one unit. So, the way I calculated the turn cost was to divide the base one unit with the max number of turns that we can take on the map. I exaggerated the maximum number of turns possible and came with 0.00001 as the turn cost. This resolved the issue',
            'Using the above turn cost, there are some scenarios where the path takes one turn where a path with two turns would seem more intuitive. But it was better than seeing an angled path where the straight path seemed right.'
        ]
    },
    {
        titleIndex: 10,
        details: [
            'I wanted my application to look as if it had an infinite scroll even if I didn\'t have the data to support that. Keeping that in mind, I figured to not keep any control or action buttons on the edges of the map. I, therefore, decided to have a floating menu bar for users to operate on the map.',
            'The menu bar will have buttons laid out with a horizontal scroll where some of them when clicked will open a card over the whole screen with certain information. I referred to this article, to make the menu draggable so that users can have freedom to adjust the position for a better view of the map and the path in it.'
        ]
    },
    {
        titleIndex: 11,
        details: [
            'The map, which covers the whole screen, contains twenty-five different colors. So, when it came to choosing background color and text color for the menu and different cards, I had to choose colors that would significantly contrast with the map. I decided to go with white as primary background color and black as primary text color. Though there is some white on the map but it was too little. Therefore, white was still a safe color to proceed with.',
            'I referred to video titled \'Creating Color Schemes EASILY\' by youtube channel named \'DesignCourse\', to generate the whole palette of background and text color for different sections like subtitles, content and so on.'
        ]
    },
    {
        titleIndex: 12,
        details: [
            'To a great extent, when it came to animating anything in the application, CSS animation was the most reliable answer. Until I came across animating the card opening and closing. CSS animation will help you easily to animate the opening part but fall short when animating the closing part because css animation executes only when an element is present in the dom. When the application closes the card, it removes the card element from html dom. Therefore there doesn\'t exist any element for closing animation to execute upon. There were tricks to solve this to keep use of css animation but none were elegant. This is where I came across Angular Animation.',
            'Angular provides an animation system built upon css functionality which opens up a whole new arena in web development animation. Not only can we add closing animation, but also group multiple animations parallely or sequentially. The only drawback with angular animation is that as an engineer it could feel that there is a lot of boilerplate to perform simple tasks. But once you get a hold of it that issue is pretty negligible.'
        ]
    },
    {
        titleIndex: 13,
        details: [
            'While casually browsing through the youtube, I came across an interesting video where the author had achieved to create a typing effect for a text on his portfolio. It was really attention grabbing yet something subtle enough to have on my About Me section to make it a little less boring to look at. I didn\'t want to overuse that effect and at the sametime wanted to use it for something that makes use of that effect to tell something. This is when it struck me to use it for my job title. I have been working as a full-stack engineer which basically is a combination of frontend and backend engineering.',
            'So the effect would perform as if I am typing the job title that reads \'Frontend Engineer\' and then further appending \'Backend Engineer\' with \'+\'  sign inbetween. But then as if I quickly realized a better vocabulary to use, the effect would backspace all the typed text and then enter \'Full Stack Engineer\'.',
            'I referred many videos to re-create that effect but mainly followed the video titled \’Typewriter Effect in JavaScript\’ by youtube channel named \’Code with Ania Kubow\’. And that implementation panned out pretty satisfying, both to implement and to look at. This was one other thing that I enjoyed adding to my project.'
        ]
    }
]