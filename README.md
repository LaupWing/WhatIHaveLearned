# What I Have learned 
A website where you can document your newly learned knowledge. 

## Why did i make this?
I like learning things every day, especially in the field of programming. But it it hard to remember newly found knowledge. So i made a website to store your knowledge in specific categories that you have made!

## A Description of my code
### Main Components Tree
Below you see my component tree. In the description below the image itself is an explaination about how components work and what it does in general.
![component tree](https://raw.githubusercontent.com/LaupWing/WhatIHaveLearned/master/README_ASSETS/Diagram.png)

*   **App**: The `App` component holds the `Main` and `SideNav` components. The `App` component main purpose is to initalize the website settings by checking if the user is logged in or not. And loads in the initial data.
*   **Main**: The `Main` component is the most complex component in this application. The `Main` component is an dyamic html editor used by using the text editor `Quill` (this may change in te future). By a change in the `Vuex` file (SetMainContent mehtod) it triggers a change in the `Main` component.
*   **SideNav**: The `SideNav` is an dynamic navigation for the application. It allows the user to navigate through the diffrent collections, collectiondetails and the section with its own chapters. This is why the `SideNav` got so many child components
    *   **Auth**: The `Auth` components holds the `Login` and `Signin` components. Based on the current state of the user (logged in or not logged in via Vuex) it determines if this Component has to show or not.
        *   **Login**: For the user to login
        *   **Signup**: For the user to signup
    *   **ListContainer**: This container along with the following containers holds the content of the user which he or she has created and saved to the db. The following components are pretty much alike, based on the user actions the `Vuex` file updates which triggers the ListContainer to either show the list of collection or the collection details.
        *   **ListCollection**: List of collections
        *   **CollectionDetails**: Details of a collection
            *   **Overview**: List of sections
            *   **Section**: Sectiondetails
## Todo 
- [ ] Refactor icon svg icons hover
- [x] Finish the sections
- [ ] Refactor the sections and collection parts
- [ ] Refactor the way data changes the content
    - Does it need to be after its saved
    - Does it need to be before its saved
- [ ] Data handling functions should only be in the vuex file
- [ ] Change the hover functional of the icon buttons in the settings
- [ ] Delete the checkTypeIcon function
- [x] Change directory names and decide which components activate the main content

# Buggs To fix
- [x] Saving bug
- [ ] Saving works but is a bit slow