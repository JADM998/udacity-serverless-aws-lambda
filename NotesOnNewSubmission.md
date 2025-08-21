### Notes on new submission:

In this new submission I have included the following changes:

1. Added validation against empty/null strings for name in both `CreateTodo` and `UpdateTodo` in their JSON Schemas.
2. I have also added validation for invalid dates using Regex.
3. I've added Path parameter validation for endpoints that use it inside the lambda Handler. I've made it by relying on uuid package `validate` and `version` functions. The handlers that implemented this are `DeleteTodo`, `GenerateUploadUrl` and `UpdateTodo`.
