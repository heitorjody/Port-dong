const fetch = require('node-fetch');
const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, content } = JSON.parse(event.body);

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });

    try {
        const response = await octokit.repos.createOrUpdateFileContents({
            owner: 'heitorjody',
            repo: 'Port-dong',
            path: `images/${name}`,
            message: `Add ${name}`,
            content: Buffer.from(content, 'base64').toString('base64'),
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
