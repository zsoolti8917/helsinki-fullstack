```mermaid
sequenceDiagram;
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: json - content: "test" date:"2024-11-27T10:08:16.363Z"
    deactivate server
```