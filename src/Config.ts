const Config = {
    content_type: "application/json; charset=utf-8",
    base_url: "https://onesignal.com",
    base_url_upload_image: "https://xq8cb2bnje.execute-api.us-east-1.amazonaws.com/prod",
    app_id: "21448731-5b54-47ed-bb61-757d4cedc90b",    // (vikash.dev)
    included_segments: ["Subscribed Users"],
    api_key: process.env.REACT_APP_API_KEY
};

export default Config;