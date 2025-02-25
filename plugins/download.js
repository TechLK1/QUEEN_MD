const {
  fetchJson
} = require("../lib/functions");
const {
  downloadTiktok
} = require('@mrnima/tiktok-downloader');
const {
  facebook
} = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const {
  igdl
} = require("ruhend-scraper");
const axios = require('axios');
const {
  cmd,
  commands
} = require("../command");

//==============================================================
const {
  sinhalaSub
} = require("mrnima-moviedl");
cmd({
  'pattern': "sinhalasub",
  'alias': ["movie"],
  'react': '📽',
  'category': "download",
  'desc': "Search movies on sinhalasub and get download links",
  'filename': __filename
}, async (_0x3dfd8e, _0x4ceff8, _0xe26d99, {
  from: _0x4a183a,
  q: _0x2f9e41,
  reply: _0x20f27b
}) => {
  try {
    if (!_0x2f9e41) {
      return await _0x20f27b("*Please provide a search query! (e.g., Deadpool)*");
    }
    var _0xb3afe = await sinhalaSub();
    const _0x5c943b = await _0xb3afe.search(_0x2f9e41);
    const _0x66d8c6 = _0x5c943b.result.slice(0x0, 0xa);
    if (!_0x66d8c6 || _0x66d8c6.length === 0x0) {
      return await _0x20f27b("No results found for: " + _0x2f9e41);
    }
    let _0x563ad3 = "📽️ *Search Results for* \"" + _0x2f9e41 + "\":\n\n";
    _0x66d8c6.forEach((_0x5634fb, _0x85e080) => {
      _0x563ad3 += '*' + (_0x85e080 + 0x1) + ".* " + _0x5634fb.title + "\n🔗 Link: " + _0x5634fb.link + "\n\n";
    });
    const _0x5c02b8 = await _0x3dfd8e.sendMessage(_0x4a183a, {
      'text': _0x563ad3
    }, {
      'quoted': _0xe26d99
    });
    const _0xc5b266 = _0x5c02b8.key.id;
    _0x3dfd8e.ev.on("messages.upsert", async _0x3276da => {
      const _0x220196 = _0x3276da.messages[0x0];
      if (!_0x220196.message) {
        return;
      }
      const _0x3f6bef = _0x220196.message.conversation || _0x220196.message.extendedTextMessage?.['text'];
      const _0xfacf40 = _0x220196.message.extendedTextMessage && _0x220196.message.extendedTextMessage.contextInfo.stanzaId === _0xc5b266;
      if (_0xfacf40) {
        const _0x5975fb = parseInt(_0x3f6bef.trim());
        if (!isNaN(_0x5975fb) && _0x5975fb > 0x0 && _0x5975fb <= _0x66d8c6.length) {
          const _0x51bcf2 = _0x66d8c6[_0x5975fb - 0x1];
          const _0x3c116b = "https://api-site-2.vercel.app/api/sinhalasub/movie?url=" + encodeURIComponent(_0x51bcf2.link);
          try {
            const _0x306fd2 = await axios.get(_0x3c116b);
            const _0x4bd79a = _0x306fd2.data.result;
            const _0x446048 = _0x4bd79a.dl_links || [];
            if (_0x446048.length === 0x0) {
              return await _0x20f27b("No PixelDrain links found.");
            }
            let _0x3dc978 = "🎥 *" + _0x4bd79a.title + "*\n\n";
            _0x3dc978 += "*Available PixelDrain Download Links:*\n";
            _0x446048.forEach((_0x359c3a, _0x5298f6) => {
              _0x3dc978 += '*' + (_0x5298f6 + 0x1) + ".* " + _0x359c3a.quality + " - " + _0x359c3a.size + "\n🔗 Link: " + _0x359c3a.link + "\n\n";
            });
            const _0xf30520 = await _0x3dfd8e.sendMessage(_0x4a183a, {
              'text': _0x3dc978
            }, {
              'quoted': _0x220196
            });
            const _0xe5d24f = _0xf30520.key.id;
            _0x3dfd8e.ev.on('messages.upsert', async _0xbe427f => {
              const _0x5e6a04 = _0xbe427f.messages[0x0];
              if (!_0x5e6a04.message) {
                return;
              }
              const _0x3e46b6 = _0x5e6a04.message.conversation || _0x5e6a04.message.extendedTextMessage?.['text'];
              const _0x14cafc = _0x5e6a04.message.extendedTextMessage && _0x5e6a04.message.extendedTextMessage.contextInfo.stanzaId === _0xe5d24f;
              if (_0x14cafc) {
                const _0x315031 = parseInt(_0x3e46b6.trim());
                if (!isNaN(_0x315031) && _0x315031 > 0x0 && _0x315031 <= _0x446048.length) {
                  const _0x2677a1 = _0x446048[_0x315031 - 0x1];
                  const _0x58dd91 = _0x2677a1.link.split('/').pop();
                  await _0x3dfd8e.sendMessage(_0x4a183a, {
                    'react': {
                      'text': '⬇️',
                      'key': _0xe26d99.key
                    }
                  });
                  const _0x27bb65 = "https://pixeldrain.com/api/file/" + _0x58dd91;
                  await _0x3dfd8e.sendMessage(_0x4a183a, {
                    'react': {
                      'text': '⬆',
                      'key': _0xe26d99.key
                    }
                  });
                  await _0x3dfd8e.sendMessage(_0x4a183a, {
                    'document': {
                      'url': _0x27bb65
                    },
                    'mimetype': "video/mp4",
                    'fileName': _0x4bd79a.title + " - " + _0x2677a1.quality + '.mp4',
                    'caption': _0x4bd79a.title + "\nQuality: " + _0x2677a1.quality + "\nPowered by SinhalaSub",
                    'contextInfo': {
                      'mentionedJid': [],
                      'externalAdReply': {
                        'title': _0x4bd79a.title,
                        'body': "㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 ꧁𝚀𝚄𝙴𝙴𝙽 〽️Ｄ",
                        'mediaType': 0x1,
                        'sourceUrl': _0x51bcf2.link,
                        'thumbnailUrl': _0x4bd79a.image
                      }
                    }
                  }, {
                    'quoted': _0x5e6a04
                  });
                  await _0x3dfd8e.sendMessage(_0x4a183a, {
                    'react': {
                      'text': '✅',
                      'key': _0xe26d99.key
                    }
                  });
                } else {
                  await _0x20f27b("Invalid selection. Please reply with a valid number.");
                }
              }
            });
          } catch (_0x3bf620) {
            console.error("Error fetching movie details:", _0x3bf620);
            await _0x20f27b("An error occurred while fetching movie details. Please try again.");
          }
        } else {
          await _0x20f27b("Invalid selection. Please reply with a valid number.");
        }
      }
    });
  } catch (_0x14553d) {
    console.error("Error during search:", _0x14553d);
    _0x20f27b("*An error occurred while searching!*");
  }
});
