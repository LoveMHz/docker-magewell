import express from 'express';
import bodyparser from 'body-parser';

const app = express();
const port = process.env.PORT || 3204;

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

function execShellCommand(cmd: any) {
  const exec = require('child_process').exec;

  return new Promise((resolve, _reject) => {
    exec(cmd, (error: any, stdout: unknown, stderr: unknown) => {
      if(error) { console.warn(error); }
      resolve(stdout ? stdout : stderr);
    });
  });
}

app.get('/screenshot', async(req, res) => {
  const screenshotPath = `/tmp/magewell_${new Date().toISOString()}.png`;
  await execShellCommand(`ffmpeg -i /dev/video0 -vframes 1 ${screenshotPath}`);
  res.download(screenshotPath);
});

//
app.listen(port, () => {
  console.log(`Running at port ${port}`);
});