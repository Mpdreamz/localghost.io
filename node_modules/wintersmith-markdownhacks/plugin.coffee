fs = require 'fs'
path = require 'path'
url = require 'url'

module.exports = (wintersmith, callback) ->

  class LocalGhostPage extends wintersmith.plugins.MarkdownPage
    
    getHtml: (base) ->
      html = super base
      html = html.replace(/(<img[^>]+>)/g, '<div class="image-wrapper">$1</div>')
      return html
    
       
  wintersmith.registerContentPlugin 'pages', '**/*.*(markdown|mkd|md)', LocalGhostPage

  callback()
