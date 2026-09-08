\# Inkwell API Contract — v1



\## POST /api/auth/register

Request: { email: string, displayName: string, password: string }

Success: 201 { user: UserPublic, accessToken: string, refreshToken: string }

Errors:

&#x09;400 EMAIL\_ALREADY\_REGISTERED — "This email is already registered."

&#x09;400 WEAK\_PASSWORD — "Password does not meet strength requirements."



\## POST /api/auth/login

Request: { email: string, password: string }

Success: 200 { user: UserPublic, accessToken: string, refreshToken: string }

Errors:

&#x09;401 INVALID\_CREDENTIALS — "Invalid email or password."



\## GET /api/posts?page=n

Success: 200 { posts: PostPublic\[], page: number, hasMore: boolean }



\## POST /api/posts/:id/comments

Request:

{

&#x20; body: string

}

Success: 201

{

&#x20; comment: CommentPublic

}

Errors:

401 UNAUTHORIZED — "You must be logged in to comment."

404 POST\_NOT\_FOUND — "Post not found."

400 INVALID\_CONTENT — "Comment body cannot be empty."

