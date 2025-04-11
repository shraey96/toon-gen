import mixpanel from "mixpanel-browser";

const isDev = process.env.NODE_ENV === "development";

const MIXPANEL_PROJECT_TOKEN = process.env.MIXPANEL_PROJECT_TOKEN;
const MIXPANEL_DEBUG = isDev;

mixpanel.init(MIXPANEL_PROJECT_TOKEN, {
  debug: MIXPANEL_DEBUG,
});

export const ANALYTICS_EVENTS = {
  PAGE_VIEWED: "Page Viewed",

  HEADER_LINK_CLICKED: "Header Link Clicked",

  APP_OPENED: "App Opened",

  TAB_CHANGED: "Tab Changed",

  FILE_UPLOADED: "File Uploaded",
  CAMERA_UI_OPENED: "Camera UI Opened",
  STYLE_SELECTED: "Style Selected",

  GALLERY_VIEWED: "Gallery Viewed",

  GENERATE_IMAGE_CLICKED: "Generate Image Clicked",
};

export const trackAnalytics = (eventName = "", config = {}) => {
  const analyticsPayload = {
    ...config,
    app_config: {
      app_name: "ZappyToon",
    },
  };

  if (isDev) {
    console.log(`[Analytics] ${eventName}`, analyticsPayload);
    return;
  }

  mixpanel.track(eventName, analyticsPayload);
};
