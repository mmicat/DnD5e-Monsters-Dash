# Web Development Project 6 - DnD 5e Random Monsters Data Dashboard

Submitted by: **Mira Ismail**

This web app: **A dashboard of random Dungeons and Dragons 5th edition monsters with the ability to filter by size, min/max HP, and search by name. The app features dynamic routing to a unique character sheet for each monster, and interactive data visualizations tracking monster stats.**

Time spent: **3** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - _To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording._
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - _To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording._
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset

The following **optional** features are implemented:

- [ ] The site’s customized dashboard contains more content that explains what is interesting about the data
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [ ] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations

The following **additional** features are implemented:

- [x] Full UI overhaul using a custom earthy/parchment light theme.
- [x] Custom Google Fonts integration (Pirata One, DM Sans).
- [x] Custom CSS Loading spinner animation while fetching data.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='YOUR_GIF_LINK_HERE' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace YOUR_GIF_LINK_HERE with the link to whatever GIF tool you used! -->

GIF created with Snip & Sketch for Windows

## Notes

Challenges encountered:

- Learning to configure React Router with nested routes and Outlet layouts.
- Structuring the D&D API array data correctly so that it could be consumed and plotted by the Recharts library.

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
