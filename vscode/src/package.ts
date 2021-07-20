import { MarkdownString, TreeItem, TreeItemCollapsibleState } from "vscode";

export interface ConsolePackage {
  // The JSON from console may not follow the naming-convention.
  /* eslint-disable @typescript-eslint/naming-convention */
  name: string;
  description: string
  license: string
  url: string
  version: string
  dependencies: ConsoleDependency[]
  /* eslint-enable @typescript-eslint/naming-convention */
}

export interface ConsoleDependency {
  // The JSON from console may not follow the naming-convention.
  /* eslint-disable @typescript-eslint/naming-convention */
  url: string
  version: string
  /* eslint-enable @typescript-eslint/naming-convention */
}

export class Package extends TreeItem  {
  name: string;
  desc: string;
  license: string;
  url: string;
  version: string;
  dependencies: ConsoleDependency[];

  constructor(pkg: ConsolePackage) {
    super(pkg.name, TreeItemCollapsibleState.Collapsed);
    this.name = pkg.name;
    this.desc = pkg.description;
    this.license = pkg.license;
    this.url = pkg.url;
    this.version = pkg.version;
    this.dependencies = pkg.dependencies;

    this.id = this.url;
    this.contextValue = "package";
    this.tooltip = new MarkdownString(Package.generateMarkdownString(this));
  }

  static generateMarkdownString(pkg: Package): string {
    return `
### ${pkg.name}
[${pkg.url}](https://${pkg.url})

--------------------------------
#### Description

${pkg.desc}

--------------------------------
#### License

${pkg.license}
`;
  }
}

export class Version extends TreeItem  {
  pkg: Package;

  constructor(pkg: Package) {
    super(pkg.version, TreeItemCollapsibleState.None);
    this.pkg = pkg;

    this.id = pkg.url + "@" + pkg.version;
    this.contextValue = "package-version";
  }
}
