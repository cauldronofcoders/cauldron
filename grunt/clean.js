module.exports = {
  dist: {
    files: [
      {
        dot: true,
        src: [
          '<%= package.path.tmp %>',
          '<%= package.path.dist %>/{,*/}*',
          '!<%= package.path.dist %>/.git*'
        ]
      }
    ]
  },
  server: '<%= package.path.tmp %>',
  channels: 'dist-channels',
  yslowReports: 'report/yslow'
};
