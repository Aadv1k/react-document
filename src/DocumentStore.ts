export interface FlatPage {
  url: string;
  content: string;
}

export interface Page {
  title: string;
  url: string;
  content: string;
  children: Array<Page>;
}


export default class DocumentStore {
  pages: Map<string, Page>;

  constructor() {
    this.pages = new Map();
  }

  set(page: Page): void {
    this.pages.set(page.url, page);
  }

  get(): Page[] {
    return Array.from(this.pages.values());
  }

  getNormalized(): FlatPage[] {
    const flatPages: FlatPage[] = [];

    function flatten(page: Page, parentUrl = '') {
      const pageUrl = page.url;

      if (page.content) {
        flatPages.push({ url: pageUrl, content: page.content });
      }

      if (page.children && page.children.length > 0) {
        for (const childPage of page.children) {
          flatten(childPage, pageUrl);
        }
      }
    }

    for (const page of this.pages.values()) {
      flatten(page);
    }

    return flatPages;
  }
}
