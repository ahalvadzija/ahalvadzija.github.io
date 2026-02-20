<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>RSS Feed</title>
        <style>
          body { font-family: monospace; background: #0f172a; color: #3182ce; padding: 50px; }
          .item { margin-bottom: 20px; border-bottom: 1px dashed #3182ce; padding-bottom: 10px; }
          a { color: #f1f5f9; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>RSS FEED - <xsl:value-of select="/rss/channel/title"/></h1>
        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <a href="{link}"><xsl:value-of select="title"/></a>
            <p style="color: #64748b; font-size: 12px;"><xsl:value-of select="pubDate"/></p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>