Application Name: TinyNotes
A minimal text-sharing application where users can create, view, and manage text snippets via a simple web interface.

1. Functional Requirements
Core Features
User Signup & Login

Users can create an account with an email/password.
Logged-in users can create, view, and delete their own snippets.
Snippet Creation

Users can enter a title and text content into a form.
Upon saving, the snippet is assigned a unique ID and stored in the system.
Snippets can be marked public (anyone can view via a link) or private (only the creator can view).
Snippet Viewing

Users can see a list of their own snippets.
Public snippets can be accessed via a unique URL.
Private snippets should only be visible to the creator.
Snippet Deletion

Users can delete their own snippets.
2. User Interface & Page Structure
1. Home Page (/)
If not logged in: Show a login/signup form.
If logged in: Show a dashboard with a list of the user’s snippets and an option to create new ones.
2. Login/Signup Page (/login)
Simple form to authenticate users.
3. Create Snippet Page (/new)
Form with:
Title (text field)
Content (multi-line text box)
Privacy setting (Public / Private)
Submit button
4. View Snippet Page (/snippet/{id})
Displays the snippet’s title and content.
If public: Anyone with the link can view.
If private: Only the owner should be able to view it.
5. Delete Snippet (/delete/{id})
Button to delete snippet (only for owner).
Should require authentication and check ownership.