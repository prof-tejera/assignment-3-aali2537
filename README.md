# Student Implementation/Notes

- Pulled out and refactored the sliding selection bar I had for the settings component to also double up as the queue tracker when the workout is running
- Made an effort to be more responsive and have the timers and all pages size appropriately with resolution.
- Majority of my time was spent on the animations for the queue display which features chaining animations together for the final effect. I think the way I implemented this with onAnimationEnd was quite messy and in hindsight I think I should have looked into an external libray such as react transition groups.
- Queue Overview functions by having the user hover over individual panels to view information about each timer, while deleting any timers will always slide more timers in to fill the page when there are enough timers (will also move users back to the previous page if one deletes all timers in a page automatically) . Additionally, adding timers will always leave users at the last page if there are enough timers for multiple pages.
- For the timer itself I created an additional context that houses the queue with getter and remover functions to function as an api that my timer context accessed to grab individual timer settings at a time.
- Initially I was going to have some delay between each timer as a feature but upon reading the course slack channel it seemed the intended way was to have no delay so I have implemented it as such.
- Another feature I was unsure of was the fast forward functionality. The way mine originally worked was if the timer was paused and the user fast forwarded, the timer would skip to the next one but remained pause. I thought it would make more sense to automatically play and resume once skipping to the next timer, but can revert this if necessary.
- Lastly users can click the edit button during the timer running to go back to the queue overview/edit page( counts as a reset workout click so loading back into the workout app will not keep workout progress).

Assignment Link: https://prof-tejera.github.io/assignment-3-aali2537

# Objective for Assignment 3

This is the 3rd and last assignment (A3) for E-39 Design Principles in React. Using our timers from Assignment 2 (A2), we will build a workout app that allows our users to assemble **multiple timers** into a workout queue. This workout queue will be executed in the order that the timers were added. Let's take a look at an example:

![Workout example 1](images/example_workout.png)

## Structural Changes to Context

We will have to make changes to our context in order to support the requirements for A3. In A2 we had to store the state of only one timer that we were configuring, now we will have to store all of the timers that the user has configured and the order that the timers will be executed when the user runs the workout. The order that the timers are created is the order in which they are executed.

The choice of data structure should be a queue, which follows First-In-First-Out, and supports the normal enqueue (add item to the queue) and dequeue (removes item from the queue). How you implement the queue is up to you, but things to consider are that:

1. Each timer can be in one of three states: running, completed, and not running. You will need a way to keep track of what state the timer is in, so that you can display it accordingly (see the image above)
2. During configuration, the user can remove any timer from the queue, so you will be supporting deleting
3. While the timer is running, you will need to either store or dynamically calculate which timer is active.
4. You don't want to clear the configurations as the timers are running. The user should be able to restart the entire workout at anytime

## Changes to Routing

Currently we have two routes `/` and `/docs`. We are going to be modifying our `/` screen and add a new one called `/add` using react-router.

### Home - Path should be `/`

- List of timers to be run for a workout. User should be able to remove a timer
- The total time the workout will take
- A button to "Add" a new timer. This button brings the user to the `/add` screen
- Controls to Pause/Resume the workout
- Controls to reset the workout back to its initial state
- Controls to "fast-forward" - ends the current running timer and moves onto the next one

### Add Timer - Path should be `/add`

- When user clicks "Add" from **Home** screen, they are routed to this page, where they can choose the type of timer and configure all inputs for each timer. After configuring, the user confirms and the timer is added to the list.
- The `/add` page should allow the user to configure any of the four timers (stopwatch, countdown, XY, and tabata)
- The user should be able to go back to the home page from here

## Installing and Running the project

As you have noticed this repository is empty. To begin this assignment you must copy over all of our files from A2 into this repo. **Do not copy over the `.git` directory and the `.gitignore` file.**.

## Deliverable

- A user can configure (combination of any timers in any order) and execute a workout
- All four timers must be functional: stopwatch, countdown, tabata, and XY.
- Routing must be configured to support the home route (`/`) and add route (`/add`)
- As you make modifications to your generic components, make sure to update documentation and prop-types.

## Grading Rubric

- A workout can be configured with any combination of timers
- Final workout application should be bug free
- DRY (do not repeat yourself). Try to make sure common code is shared and not copy/pasted
- Console is free of warnings/errors
- Documentation and prop-types are defined and accurate

### Deployment Instructions (GH actions)

- Go to `Settings`
- Go to `Pages`
- in `Source`, select `gh-pages` branch
- Click Save
- In `package.json`, add a new key/value as: `"homepage": "https://prof-tejera.github.io/<repo>"`

Once the `build-deploy` action finishes running, the app should be live
at `https://prof-tejera.github.io/<repo>`

For other ways to deploy see https://github.com/prof-tejera/react-deployment-code

## Bonus

- Add full test coverage using Cypress.io. This will require that you get your tests running locally and then add a new Github action that will run the tests every time you commit to GitHub. Note that the Cypress setup is not part of this project and must be configured by you (max 8 points)
