# Web Development Project 5 - DnD 5e Random Monsters Data Dashboard

Submitted by: **Mira Ismail**

This web app: **A dashboard of random Dungeons and Dragons 5th edition monsters with the ability to filter by size, min/max HP and search by name.**

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data**
  - The app dashboard includes at least three summary statistics about the data, such as:
    - Total amount of monsters loaded
    - Average Hit Points (HP)
    - Highest Armor Class (AC)
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

- Full UI overhaul using a custom earthy light theme
- Custom Google Fonts integration (Pirata One, DM Sans)
- Custom CSS Loading spinner animation while fetching data

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![image](https://i.imgur.com/usFpHqq.gif)
![Alt text](image.png)
[https://i.imgur.com/usFpHqq.gif](https://i.imgur.com/usFpHqq.gif)

GIF created with Snip & Sketch for Windows

## Notes

Challenges encountered:

- Learning the strict "Rules of Hooks" and ensuring `useState` is called at the top level of the component.
- Resolving a React crash caused by attempting to render API objects (like the `speed` object) directly into the UI.

## License

    Copyright 2026 Mira Ismail

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
