angular.module('ngMetaDemoApp')
  .controller('DynamicTagsCtrl', function(ngMeta) {
    var ctrl = this;
    var titleArticle = {
      'index': 1,
      'title': 'Title',
      'author': 'Author of Article 1',
      'content': 'ngMeta.setTitle(title [, titleSuffix]) lets you update the title from the controller. You can optionally provide a title suffix, which is used in place of the default title suffix when it is enabled.',
      'examples': [{
        'code': 'ngMeta.setTitle(\'Hello\')',
        'text': 'This sets the title of the page to \'Hello\', followed by the default title suffix, if it exists/is enabled in the config phase'
      }, {
        'code': 'ngMeta.setTitle(\'Hello\',\' | Site name\')',
        'text': 'The title of the page is \'Hello | Site name\''
      }, {
        'code': 'ngMeta.setTitle(\'Hello\', \'\')',
        'text': 'This ensures that the title of the page is \'Hello\', overriding the use of the default suffix'
      }]
    };
    var tagArticle = {
      'index': 2,
      'title': 'Tag',
      'author': 'Author of Article 2',
      'content': 'ngMeta.setTag(metaTagKey, metaTagValue) lets you set/update arbitrary tags (other than title).',
      'examples': [{
        'code': 'ngMeta.setTag(\'author\', \'Oscar Wilde\')',
        'text': 'Sets \'Oscar Wilde\' as the author of the page. Use {{ngMeta.author}} while defining meta tags in HTML'
      }, {
        'code': 'ngMeta.setTag(\'descriptionOfThePage\',\'Description of the page\')',
        'text': 'The key need not be a valid meta tag'
      }, {
        'code': 'ngMeta.setTitle(\'og:image\', \'http://example.com/image.jpg\')',
        'text': 'Use {{ngMeta[\'og:image\']}} while setting the meta tag in HTML'
      }]
    };

    ctrl.loadArticle = function(index) {
      if (index == tagArticle.index) {
        ctrl.article = tagArticle;
      } else {
        ctrl.article = titleArticle;
      }
      ngMeta.setTitle(ctrl.article.title, ' | Dynamic meta tags example - ngMeta');
      ngMeta.setTag('author', ctrl.article.author);
      ctrl.expanded = false;
    };
  });