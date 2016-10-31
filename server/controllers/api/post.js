import Router from 'koa-router'

// Create router and set pathname starts with
export const router = new Router({ prefix: '/api/v1/post' })

const storage = [
  { id: 1,    title: 'Knockin\' On Heaven\'s Door',             artist: 'Guns N\' Roses',     duration: 342,    mp3: 'Guns N\' Roses - Knockin\' On Heaven\'s Door.mp3',     poster: 'Guns N\' Roses.jpg',           lyric: 'Guns N\' Roses - Knockin\' On Heaven\'s Door.lrc'     },
  { id: 2,    title: 'I Will Be Your Shelter',                  artist: 'Rebecca Blaylock',   duration: 342,    mp3: 'Rebecca Blaylock - I Will Be Your Shelter.mp3',        poster: 'Rebecca Blaylock.jpg',         lyric: 'Rebecca Blaylock - I Will Be Your Shelter.lrc'        },
  { id: 3,    title: '我恨我痴心',                              artist: '刘德华',             duration: 342,    mp3: '刘德华 - 我恨我痴心.mp3',                              poster: '刘德华.jpg',                   lyric: '刘德华 - 我恨我痴心.lrc'                              },
  { id: 4,    title: '不说再见',                                artist: '好妹妹乐队',         duration: 342,    mp3: '好妹妹乐队 - 不说再见.mp3',                            poster: '好妹妹乐队.jpg',               lyric: '好妹妹乐队 - 不说再见.lrc'                            },
  { id: 5,    title: '青城山下白素贞',                          artist: '好妹妹乐队',         duration: 342,    mp3: '好妹妹乐队 - 青城山下白素贞.mp3',                      poster: '好妹妹乐队.jpg',               lyric: '好妹妹乐队 - 青城山下白素贞.lrc'                      },
  { id: 6,    title: '送情郎(2010.12.11 德云二队张一元晚场)',   artist: '岳云鹏',             duration: 342,    mp3: '岳云鹏 - 送情郎(2010.12.11 德云二队张一元晚场).mp3',   poster: '岳云鹏.jpg',                   lyric: '岳云鹏 - 送情郎(2010.12.11 德云二队张一元晚场).lrc'   },
  { id: 7,    title: '往事只能回味',                            artist: '岳云鹏,宋小宝',      duration: 342,    mp3: '岳云鹏,宋小宝 - 往事只能回味.mp3',                     poster: '岳云鹏,宋小宝.jpg',            lyric: '岳云鹏,宋小宝 - 往事只能回味.lrc'                     },
  { id: 8,    title: '天梯(Live) - live',                       artist: '张智霖',             duration: 342,    mp3: '张智霖 - 天梯(Live) - live.mp3',                       poster: '张智霖.jpg',                   lyric: '张智霖 - 天梯(Live) - live.lrc'                       },
  { id: 9,    title: '友情岁月',                                artist: '李克勤',             duration: 342,    mp3: '李克勤 - 友情岁月.mp3',                                poster: '李克勤.jpg',                   lyric: '李克勤 - 友情岁月.lrc'                                },
  { id: 10,   title: '合久必婚',                                artist: '李克勤',             duration: 342,    mp3: '李克勤 - 合久必婚.mp3',                                poster: '李克勤.jpg',                   lyric: '李克勤 - 合久必婚.lrc'                                },
  { id: 11,   title: '天梯',                                    artist: '李克勤',             duration: 342,    mp3: '李克勤 - 天梯.mp3',                                    poster: '李克勤.jpg',                   lyric: '李克勤 - 天梯.lrc'                                    },
  { id: 12,   title: '爱不释手',                                artist: '李克勤',             duration: 342,    mp3: '李克勤 - 爱不释手.mp3',                                poster: '李克勤.jpg',                   lyric: '李克勤 - 爱不释手.lrc'                                },
  { id: 13,   title: '飞花',                                    artist: '李克勤',             duration: 342,    mp3: '李克勤 - 飞花.mp3',                                    poster: '李克勤.jpg',                   lyric: '李克勤 - 飞花.lrc'                                    },
  { id: 14,   title: '充满希望',                                artist: '玛莉亚',             duration: 342,    mp3: '玛莉亚 - 充满希望.mp3',                                poster: '玛莉亚.jpg',                   lyric: '玛莉亚 - 充满希望.lrc'                                },
  { id: 15,   title: '友谊之光',                                artist: '玛莉亚',             duration: 342,    mp3: '玛莉亚 - 友谊之光.mp3',                                poster: '玛莉亚.jpg',                   lyric: '玛莉亚 - 友谊之光.lrc'                                },
  { id: 16,   title: '老中医',                                  artist: '花粥',               duration: 342,    mp3: '花粥 - 老中医.mp3',                                    poster: '花粥.jpg',                     lyric: '花粥 - 老中医.lrc'                                    },
  { id: 17,   title: '静静的看着你装逼',                        artist: '花粥&四四',          duration: 342,    mp3: '花粥&四四 - 静静的看着你装逼.mp3',                     poster: '花粥&四四.jpg',                lyric: '花粥&四四 - 静静的看着你装逼.lrc'                     },
  { id: 18,   title: '也曾相识',                                artist: '谭咏麟',             duration: 342,    mp3: '谭咏麟 - 也曾相识.mp3',                                poster: '谭咏麟.jpg',                   lyric: '谭咏麟 - 也曾相识.lrc'                                },
  { id: 19,   title: '夏日寒风',                                artist: '谭咏麟',             duration: 342,    mp3: '谭咏麟 - 夏日寒风.mp3',                                poster: '谭咏麟.jpg',                   lyric: '谭咏麟 - 夏日寒风.lrc'                                },
  { id: 20,   title: '雾之恋',                                  artist: '谭咏麟',             duration: 342,    mp3: '谭咏麟 - 雾之恋.mp3',                                  poster: '谭咏麟.jpg',                   lyric: '谭咏麟 - 雾之恋.lrc'                                  },
]

/**
 * GET /
 */
router.get('/', ctx => {
  // TODO:
  ctx.body = storage
})
