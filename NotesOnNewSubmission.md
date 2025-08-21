### Notes on new submission:

In this new submission I have included the following changes:

1. Added validation against empty/null strings for name in both `CreateTodo` and `UpdateTodo` in their JSON Schemas.
2. I have also added validation for invalid dates using Regex.
3. I've added Path parameter validation for endpoints that use it inside the lambda Handler. I've made it by relying on uuid package `validate` and `version` functions. The handlers that implemented this are `DeleteTodo`, `GenerateUploadUrl` and `UpdateTodo`.

Also, for the bug mentioned in the previous review:

- It seems like there was a problem by how the `CreateTodo` endpoint was returning a new todoItem, it didn't contain all expected keys. Fixed it and seems like a series of bugs related to todoId being undefined when creating a new todo were gone.

Now, the expected behaviour of the page given the previous feedback:
1. It is no longer possible to create empty Todos (Empty string todos).
2. There is no problem trying to delete, update or upload an image of a todo.
3. The API is more secure and has more validations.