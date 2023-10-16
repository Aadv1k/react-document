const mockData: Page = [
    {
      title: "Getting Started",
      url: "/documentation/getting-started",
      content: "## Getting Started\nFollow these steps to get started.",
      children: [
        {
          title: "Installation",
          url: "/documentation/getting-started/installation",
          content: "### Installation\nInstall our software.",
          children: [],
        },
        {
          title: "Usage",
          url: "/documentation/getting-started/usage",
          content: "### Usage\nLearn how to use our software.",
          children: [],
        },
      ],
    },
    {
      title: "Advanced Topics",
      url: "/documentation/advanced-topics",
      content: "## Advanced Topics\nExplore advanced concepts and features.",
      children: [
        {
          title: "Customization",
          url: "/documentation/advanced-topics/customization",
          content: "### Customization\nCustomize our software.",
          children: [],
        },
        {
          title: "Troubleshooting",
          url: "/documentation/advanced-topics/troubleshooting",
          content: "### Troubleshooting\nCommon issues and solutions.",
          children: [],
        },
      ],
    },
];

export default mockData;
