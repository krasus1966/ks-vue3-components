/**
 * https://api.onlyoffice.com/editors/config/
 */
export interface OnlyOfficeConfig {
  // 文档类型
  documentType: 'word' | 'cell' | 'slide',
  // 编辑器高度
  height: string,
  // 编辑器宽度
  width: string,
  // 访问类型 desktop桌面 mobile移动 embedded内嵌
  type: 'desktop' | 'mobile' | 'embedded',
  // jwt token
  token?: string,
  // 文档参数
  document: OnlyOfficeDocument,
  // 编辑器参数
  editorConfig?: OnlyOfficeEditorConfig,
  events?: {
    onAppReady?: (event: object) => void;
    onCollaborativeChanges?: (event: object) => void;
    onDocumentReady?: (event: object) => void;
    onDocumentStateChange?: (event: object) => void;
    onDownloadAs?: (event: object) => void;
    onError?: (event: object) => void;
    onInfo?: (event: object) => void;
    onMetaChange?: (event: object) => void;
    onMakeActionLink?: (event: object) => void;
    onOutdatedVersion?: (event: object) => void;
    onPluginsReady?: (event: object) => void;
    onRequestClose?: (event: object) => void;
    onRequestCompareFile?: (event: object) => void;
    onRequestCreateNew?: (event: object) => void;
    onRequestEditRights?: (event: object) => void;
    onRequestHistory?: (event: object) => void;
    onRequestHistoryClose?: (event: object) => void;
    onRequestHistoryData?: (event: object) => void;
    onRequestInsertImage?: (event: object) => void;
    onRequestMailMergeRecipients?: (event: object) => void;
    onRequestReferenceData?: (event: object) => void;
    onRequestRename?: (event: object) => void;
    onRequestRestore?: (event: object) => void;
    onRequestSaveAs?: (event: object) => void;
    onRequestSendNotify?: (event: object) => void;
    onRequestSharingSettings?: (event: object) => void;
    onRequestUsers?: (event: object) => void;
    onWarning?: (event: object) => void;
  }
}

export interface OnlyOfficeDocument {
  // 文件后缀
  fileType: string,
  // 文件唯一标识
  key: string,
  // 文件名
  title: string,
  // 文件地址
  url: string,
  referenceData?: {
    fileKey?: string,
    instanceId?: string
  },
  // 文档信息
  info: {
    // 目录
    folder?: string,
    // 创建人
    owner?: string,
    // 是否收藏
    favorite?:boolean,
    // 分享设置
    sharingSettings?: OnlyOfficeSharingSettingsConfig[],
    // 上传日期
    uploaded?: string
  },
  permissions: {
    chat?: boolean,
    comment?: boolean,
    commentGroups?: {
      edit?: string[],
      remove?: string[],
      view?: string
    },
    copy?: boolean,
    deleteCommentAuthorOnly?: boolean,
    download?: boolean,
    edit?: boolean,
    editCommentAuthorOnly?: boolean,
    fillForms?: boolean,
    modifyContentControl?: boolean,
    modifyFilter?: boolean,
    print?: boolean,
    protect?: boolean,
    review?: boolean,
    reviewGroups?: string[],
    userInfoGroups?: string[]
  }
}

export interface OnlyOfficeEditorConfig {
  // 回调函数
  callbackUrl: string,
  actionLink?: object,
  createUrl?: string,
  coEditing?: {
    mode?: 'fast' | 'strict',
    change?: boolean
  },
  lang?: string,
  location?: string,
  mode?: 'view' | 'edit',
  recent?: OnlyOfficeRecentConfig[],
  region?: string,
  templates?: OnlyOfficeTemplatesConfig[],
  user?: {
    id?: string,
    firstname?: string,
    lastname?: string,
    name?: string,
    group?: string,
  },
  customization?: {
    anonymous?: {
      request?: boolean;
      label?: string;
    };
    autosave?: boolean;
    chat?: boolean;
    commentAuthorOnly?: boolean;
    comments?: boolean;
    compactHeader?: boolean;
    compactToolbar?: boolean;
    compatibleFeatures?: boolean;
    customer?: {
      address?: string;
      info?: string;
      logo?: string;
      logoDark?: string;
      mail?: string;
      name?: string;
      phone?: string;
      www?: string;
    };
    features?: any;
    feedback?: any;
    forcesave?: boolean;
    goback?: any;
    help?: boolean;
    hideNotes?: boolean;
    hideRightMenu?: boolean;
    hideRulers?: boolean;
    integrationMode?: string;
    logo?: {
      image?: string;
      imageDark?: string;
      imageEmbedded?: string;
      url?: string;
    };
    macros?: boolean;
    macrosMode?: string;
    mentionShare?: boolean;
    plugins?: boolean;
    review?: {
      hideReviewDisplay?: boolean;
      hoverMode?: boolean;
      reviewDisplay?: string;
      showReviewChanges?: boolean;
      trackChanges?: boolean;
    };
    reviewDisplay?: string;
    showReviewChanges?: boolean;
    spellcheck?: boolean;
    toolbarHideFileName?: boolean;
    toolbarNoTabs?: boolean;
    trackChanges?: boolean;
    uiTheme?: string;
    unit?: string;
    zoom?: number;
  },
  embedded?: {
    embedUrl?: string;
    fullscreenUrl?: string;
    saveUrl?: string;
    shareUrl?: string;
    toolbarDocked?: string;
  },
  plugins?: {
    autostart?: string[];
    pluginsData?: string[];
    url?: string;
  }
}

export interface OnlyOfficeRecentConfig {
  folder: string,
  title: string,
  url: string
}

export interface OnlyOfficeTemplatesConfig {
  image: string,
  title: string,
  url: string
}

export interface OnlyOfficeSharingSettingsConfig {
  // 将用户图标更改为链接图标
  isLink: boolean,
  // 具有上述名称的用户的访问权限。可以是完全访问、只读或拒绝访问，
  permissions: 'Full Access' | 'Read Only' | 'Deny Access',
  // 将与其共享文档的用户的名称
  user: string
}
