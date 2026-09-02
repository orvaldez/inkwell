\# Analysis Model



\## Model Overview



\~\~\~mermaid

graph TD

&#x09;UC\["Use Cases"] --> Scenario\["Scenario-Based Model (who does what, when)"]

&#x09;UC --> Class\["Class-Based Model (what data and entities exist)"]

&#x09;UC --> Functional\["Functional Model (how data flows and transforms)"]

&#x09;UC --> Behavioral\["Behavioral Model (what states an entity can be in)"]

\~\~\~



\---

\## Scenario-Based Model



\### Use Case Diagram



\~\~\~mermaid

graph TD

&#x09;Visitor((Visitor)) --> UC1\["Register Account"]

&#x20;	Visitor --> UC2\["Log In"]

&#x20;	Reader((Reader)) --> UC3\["Browse Feed"]

&#x20;	Reader --> UC4\["Read Post"]

&#x09;Author((Author)) --> UC5\["Publish Post"]

&#x20;	Author -. extends .-> UC4

&#x20;	Reader -. extends .-> UC2

&#x20;	Author -. extends .-> UC2

\~\~\~



\---



\## Class-Based Model



\### Domain Class Diagram



\~\~\~mermaid

classDiagram

&#x20;	class User {

&#x20;		+id

&#x20;		+email

&#x20;		+displayName

&#x20;		+passwordHash

&#x20;		+createdAt

&#x20;	}

&#x20;	class Post {

&#x20;		+id

&#x20;		+title

&#x20;		+body

&#x20;		+status

&#x20;		+publishedAt

&#x20;	}

&#x20;	class Comment {

&#x20;		+id

&#x20;		+body

&#x20;		+createdAt

&#x20;	}

&#x20;	User "1" --> "\*" Post : authors

&#x20;	User "1" --> "\*" Comment : writes

&#x20;	Post "1" --> "\*" Comment : has

\~\~\~



\---



\## Functional Model



\### Registration Data Flow



\~\~\~mermaid

flowchart LR

&#x09;Visitor((Visitor)) -->|"registration form data"| Validate\["Validate and Create Account"]

&#x09;Validate -->|"user record"| UserStore\[(User Store)]

&#x20;	Validate -->|"access and refresh tokens"| Visitor

\~\~\~



\---



\## Behavioral Model



\### Post State Diagram



\~\~\~mermaid

stateDiagram-v2

&#x20;	\[\*] --> Draft: author creates post

&#x20;	Draft --> Draft: author edits

&#x20;	Draft --> Published: author publishes

&#x20;	Published --> Published: author edits (creates new version)

&#x20;	Published --> Archived: author archives

&#x20;	Archived --> \[\*]

\~\~\~







