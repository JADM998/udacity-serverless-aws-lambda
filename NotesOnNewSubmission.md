### Notes on new submission:

To my point of view, the only 2 cases where we are expecting body requests are `UpdateTodo` and `DeleteTodo`, which are the only ones that have a specific JSON Schema, all other lambda handlers expect an empty body and don't require one.

I have applied the following changes:

1. Updated `UpdateTodo` JSON Schema to require at least one property of the 3 expected.
2. Added .env variables for Auth0 in client.
3. Fixed a bug with `CreateTodo` that caused the client to fail while creating the Todo (solved by reloading the Home Page).

I also have added Http validations screenshoots inside `/screenshoots/HttpValidations`. I've only tested the request that expect a JSON body.

I hope this changes are enough for what was stated in the submission notes on my previous attempt.