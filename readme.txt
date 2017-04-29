Justin Shi
CPSC 478 Computer Graphics Final Project

Game: "Square Scraper"

"Four squares of different colors each stand atop a skyscraper, trapped in the cruelness of the
second dimension. Meteors, appearing as threatening smaller squares, fall from the heavens in each
of the four two-dimensional planes. Keep your heroic squares alive by dodging them! If you want more
of a challenge, turn on Holes Mode to randomly create sinister patches of blackness on the
precarious edges the squares walk on: if you touch them when they have turned white, you die a
plane-ful (hahahaha) death! If you still need further sensory stimulation, turn on Rotate Mode to
make the camera move around the four skyscrapers and induce nausea."

Use the arrow keys to move and the spacebar to jump.

Challenging features:

	-Collision detection: we need to detect when any of the character squares collides with the edge
of their buildings (and thus should not move anymore in a direction), a meteor, or a white hole.
To do this, we performed checks by finding the central positions of the squares based on the
coordinates of the vertices for the triangles that make them. We know for each plane, one of the
coordinates is constant; for the other two, we merely need to check if the distance between the
centers of the two coordinate axes is less than the sum of half the length of the sides of the two
squares, in which case there will be a collision.

	-Jumping and gravity simulation/cessation of falling upon collision with ground: to implement
jumping for the character squares, upon detection of the keypress of the jump button, we enter a
jump state; where the character squares are given upward (positive in the y direction) velocities,
which then update their y positions with each position update as the game progresses. An
acceleration due to gravity is applied with each update, changing the velocity for the next update,
so that the velocity slowly becomes in the negative y direction, simulating a parabolic jump, as one
might naturally expect. Finally, when the character squares' bottom vertices' y position becomes 0,
meaning the square has hit the ground, we exit the jump state (which also allows for a keypress to
trigger further jump states), set the y velocity to 0, and stop gravity from changing the y
velocity. 