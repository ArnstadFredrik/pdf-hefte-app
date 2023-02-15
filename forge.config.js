module.exports = {
  packagerConfig: {
    icon: './images/icons/icon'
  },
  rebuildConfig: {},
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'ArnstadFredrik',
          name: 'pdf-hefte-app',
          tagPrefix: 'v',
        },
        prerelease: false,
      },
    },
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        icon: './images/icons/icon.icns',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './images/icons/icon.png'
        }

      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
