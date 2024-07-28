Task: Real-time Polling System with Commenting Feature and Enhanced User
Profile Create a real-time polling system using the MERN stack, REST, and a real-time
technology like Socket.IO.
Detailed Instructions: 1. Front-End: Use React to build the front-end of the application.
This will consist of a page to create a poll, a page to vote in a poll, and a page to view the
results of a poll. The results should update in real-time as new votes are received. Make sure
to use proper state management and components structure.
2. Back-End: Use Express and Node.js for the back-end server. This server will handle
requests from the front-end, such as creating a poll, voting in a poll, retrieving poll results,
adding a comment, and retrieving user profiles.
3. Database: Use MongoDB to store the polls, the votes, the comments, and the user
profiles. Each poll should have a question and a list of options. Each vote should reference a
poll and an option. (Additional) -> Each comment should reference a poll and optionally
another comment (for replies). Each user profile should include a username, email, profile
picture, and lists of created and voted polls. RESTful APIs: Implement RESTful APIs for
handling the data communication between the front-end and the back-end.
4. Real-Time Functionality: Use Socket.IO to update the poll results in real-time on the
client side as soon as a new vote is cast.
5. Bonus: User Authentication: Add a user registration and login system, so that users can
only vote if they are logged in, and each user can only vote once per poll. Use JWT (JSON
Web Tokens) for handling authentication.
Additional Instructions:
1. Commenting Feature: Allow users to add comments on a poll. The comments should
be displayed under the poll in real-time as new comments are made. Users should be
able to reply to comments, creating a thread of replies.
2. User Profile: Improve the user profile feature. When a user logs in, they should be
able to see a profile page that includes their username, email, profile picture, a list of
polls they have created, and a list of polls they have voted on. The profile picture feature
will require handling file uploads on the server and storing the image files.
3. User Notifications (Bonus): Add a notification system. When a user's poll receives a
new vote or comment, the user should get a real-time notification
Deliverables:
• The source code of the application, pushed to a Git repository. 430, Amby Valley
Arcade, opp. Sentosa Heights, near Silver Business Hub, Uttran, Surat, Gujarat 395004 • A
README.md file explaining how to run the application, and any design choices made
during development.
• A hosted version of the application, if possible. You could use services like Vercel, or
Netlify.
Regd Office:
VLOCITY AI PRIVATE LIMITED
211, A Block, Union Heights, Opp Rahul Raj Mall, Surat - 395007
Vlocity AI INDIA PRIVATE LIMITED
MVP development in an ”as a service” subscription model
Evaluation Criteria:
1. Correct functionality of the polling system.
2. Use of React concepts such as components, props, state, hooks, and context.
3. Use of Express and Node.js for handling server-side operations.
4. Correct use of MongoDB for data storage.
5. Implementation of RESTful APIs as a data communication protocol.
6. Use of Socket.IO for real-time updates.
7. (Bonus) Implementation of user authentication using JWT.
8. Code quality, including readability, structure, and comments.
9. Use of Git, including proper commit messages.
10.Correct functionality of the commenting feature.
11.Correct functionality of the user profile feature, including handling file
uploads. 12.Use of MongoDB for storing additional data (comments, user
profiles). 13.Implementation of real-time updates for comments and notifications.
14.Security considerations for handling user data and file uploads