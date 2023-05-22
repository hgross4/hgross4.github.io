const queryUrl =
    "https://api.npr.org/query?fields=title,audio&date=current&dateType=story&sort=assigned&output=json&numResults=30&apiKey=MDA5NDM4NDA3MDEzMzY1MTMyNjA2NjIyMg001&id=";

function getStoryUrls(showId) {
    track_list = [];
    track_index = 0;
    const url = queryUrl + showId;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(storyData => {
            // console.log(storyData);
            parseStoryInfo(storyData);
        })
        .catch(error => console.log('error', error));
}

function parseStoryInfo(storyData) {
    console.log(JSON.parse(storyData).list);
    storyDataJson = JSON.parse(storyData);
    const stories = storyDataJson.list.story;
    for (story of stories) {
        try {
            const title = story.title.$text ? story.title.$text : '';
            const url = story.audio[0].format.mp4.$text;
            if (url) {
                const trackObject = {
                    title: title,
                    src: url,
                    howl: null
                }
                track_list.push(trackObject);
            }
        } catch (e) {
            console.log(e);
        }
    }
    loadPlayer();
}
