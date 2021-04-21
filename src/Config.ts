const Config = {
    content_type: "application/json; charset=utf-8",
    base_url: "https://onesignal.com",
    // app_id: "b64f8d0d-5bb0-41f1-9fef-925c4af08c6b", // (localhost)
    // app_id: "420bcf3c-c969-4d3e-b795-b1035de5a984",      // (Nick.org)
    app_id: "21448731-5b54-47ed-bb61-757d4cedc90b",    // (vikash.dev)
    included_segments: ["Subscribed Users"],
    api_key: process.env.REACT_APP_API_KEY
};

export default Config;