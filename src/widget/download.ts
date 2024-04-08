function download(url: string) {
  return new Promise<void>((resolve) => {
    const a = document.createElement('a');
    a.download = '';
    a.href = url;
    a.click();
    setTimeout(resolve, 3000);
  });
}

/**
 * 从Blob中下载文件
 * @param data 文件内容
 * @param filename 文件名
 */
function downloadBlob(data: Blob, filename = '') {
  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadText(data: string, type: 'plain' | 'json', filename = '') {
  const blob = new Blob([data], { type: 'text/' + type });
  downloadBlob(blob, filename);
}

/**
 * 无刷新无新开窗口下载
 * 通过iframe进行文件流下载
 * url表示请求路径,进入后台处理,后台返回一个文件流
 * @param {String} url 文件流URL
 * @param {Function} cb 回调函数
 */
function downloadFile(url: string) {
  return new Promise<void>((resolve) => {
    // 删除重复创建的iframe
    const downloadIframe = document.querySelector('#downloadIframe');
    if (downloadIframe) {
      document.body.removeChild(downloadIframe);
    }
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = 'downloadIframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    // 移除创建的标签
    setTimeout(resolve, 3000);
  });
}

/**
 * post下载
 * @param {String} url 文件流URL
 * @param {Object} params 查询参数
 * @param {Function} cb 查询参数
 */
function postDownloadFile(url: string, params: Record<string, any>) {
  return new Promise<void>((resolve) => {
    // 删除重复创建的Form
    const downloadForm = document.querySelector('#downloadForm');
    if (downloadForm) {
      document.body.removeChild(downloadForm);
    }
    const form = document.createElement('form');
    const appendInput = (key: string, value: any) => {
      const newInput = document.createElement('input');
      newInput.type = 'hidden';
      newInput.name = key;
      newInput.value = value;
      form.appendChild(newInput);
    };
    form.style.display = 'none';
    form.method = 'post';
    form.target = '_blank';
    form.action = url;
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        if (Array.isArray(params[key])) {
          params[key].forEach((item: any) => appendInput(key, item));
        } else {
          appendInput(key, params[key]);
        }
      }
    }
    document.body.appendChild(form);
    form.submit();
    setTimeout(resolve, 3000);
  });
}

export { download, downloadBlob, downloadFile, downloadText, postDownloadFile };
