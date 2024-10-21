<p align="center">
	<a href="https://www.producthunt.com/posts/skillsync?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-skillsync" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=499069&theme=light" alt="SkillSync - A&#0032;dev&#0032;profile&#0032;generator&#0032;act&#0032;as&#0032;your&#0032;modern&#0032;resume | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a></p>

<p align="center"><img src="https://socialify.git.ci/Ahsankhalid618/SkillSync/image?font=Source%20Code%20Pro&amp;forks=1&amp;issues=1&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Solid&amp;stargazers=1&amp;theme=Dark" "="" alt="project-image"></p>

	

<p align="center">
    <em><code>❯ A dev profile generator with Next.Js </code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Ahsankhalid618/SkillSync?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Ahsankhalid618/SkillSync?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Ahsankhalid618/SkillSync?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Ahsankhalid618/SkillSync?style=flat&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
		<em>Built with the tools and technologies:</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat-square" alt="Next.js Badge">
	<img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat-square" alt="React Badge">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat-square" alt="JavaScript Badge">
	<img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat-square" alt="TypeScript Badge">
	<img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=flat-square" alt="MongoDB Badge">
	<img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=flat-square" alt="shadcn/ui Badge">
	<br>
	<img src="https://img.shields.io/badge/NextUI-000?logo=nextui&logoColor=fff&style=flat-square" alt="NextUI Badge">
		<img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat-square" alt="Tailwind CSS Badge">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/LeetCode-FFA116?logo=leetcode&logoColor=fff&style=flat-square" alt="LeetCode Badge">
	<img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=fff&style=flat-square" alt="GitHub Badge">
</p>

<br>

###### Skillsync is A project that helps developers create stunning profiles by seamlessly fetching data from GitHub and LeetCode. With customizable features like profile images, banners, skill visualizations, and social links, Skillsync empowers you to showcase your expertise effortlessly. Built with Next.js 14, MongoDB, and more, it’s designed for developers by developers. 

## Features

- **Profile Customization**: Easily customize your profile with your image, banner, headline, and contact details.
- **Skills Visualization**: Summarize your skills with interactive charts for a quick overview of your expertise.
- **GitHub Integration**: Automatically fetch your GitHub projects and display them beautifully.
- **LeetCode Data**: Showcase your LeetCode achievements and stats.
- **Social Links**: Add links to your social networks for better connectivity.

## Tech Stack

- **Frontend**: Next.Js 14, NextUI, ShadCN
- **Backend**: Next.Js API routes, NextAuth, MongoDB
- **APIs**: GitHub Public API, LeetCode API

<h2 style="text-align: center;">Project Screenshots:</h2>

<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 10px;">
    <img src="https://raw.githubusercontent.com/Ahsankhalid618/SkillSync/refs/heads/main/public/profilenew1.png" alt="project-screenshot" style="width: 400px; height: 400px; object-fit: cover;" />
    <img src="https://raw.githubusercontent.com/Ahsankhalid618/SkillSync/refs/heads/main/public/skillsync.jpg" alt="project-screenshot" style="width: 400px; height: 400px; object-fit: cover;" />
    <img src="https://raw.githubusercontent.com/Ahsankhalid618/SkillSync/refs/heads/main/public/profilenew.png" alt="project-screenshot" style="width: 400px; height: 400px; object-fit: cover;" />
    <img src="https://raw.githubusercontent.com/Ahsankhalid618/SkillSync/refs/heads/main/public/profilenew-mobile1.png" alt="project-screenshot" style="width: 400px; height: 400px; object-fit: cover;" />
</div>



## Getting Started

Follow these steps to set up Skillsync locally:

### Prerequisites

- Node.js (version 18 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Fork and Clone the repository:**
```sh
❯ git clone https://github.com/Ahsankhalid618/SkillSync
```

2. **Navigate to the project directory:**
```sh
❯ cd SkillSync
```

3. **Install the required dependencies:**
```sh
❯ npm install
```
4. **Set up environment variables:**

Create a .env.local file in the root directory and add your configuration:
```sh
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
MONGO_URI=your_mongodb_uri
NEXTAUTH_URL=your_nextauth_secret
AUTH_SECRET=your-auth-secret
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-ID
```
5. **Run the development server:**
```sh
npm run dev
```
Open your browser and navigate to http://localhost:3000.

## Usage
- After starting the server, follow the prompts to connect your GitHub and LeetCode accounts.
- Customize your profile as desired and share it with others!

##  Contributing
**We welcome contributions from the community! To contribute to Skillsync, follow these steps:**

**Create a new branch:**

```sh
git checkout -b feature/your-feature-name
```

**Make your changes and commit:**

```sh
git add .
git commit -m "Add your commit message here"
```
**Push to your fork:**

```sh
git push origin feature/your-feature-name
```
**Create a Pull Request:** Go to the original repository and click on "New Pull Request" to submit your changes for review.

## License
**This project is licensed under the MIT License.**

## Acknowledgments
Thanks to the contributors and the open-source community for their support.
Special thanks to the creators of the libraries and tools used in this project.

## Contact
For questions or feedback, feel free to reach out via `ahsankhalid816@gmail.com` or open an issue on GitHub.
