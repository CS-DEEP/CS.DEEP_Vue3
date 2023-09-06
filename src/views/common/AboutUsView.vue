<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="web-intro">
          <p>本站介绍</p>
        </div>
      </el-header>

      <el-main>
        <div class="container">
          <div class="what">
            <h1><a href="https://github.com/CS-DEEP">CS.DEEP</a> 是什么？</h1>
            <p>
              CS.DEEP是什么这个问题其实在项目开始的时候也困扰着我们团队，我们的初心是想着为刚进入大学生活的计算机新生提供一个类似树洞的能倾述自己烦恼的地方，但是仅仅让树洞来倾诉自己的烦恼，还不如造一个不一样的“树洞”——让同学们既能倾述自己的烦恼又能收获相应的知识，让新生也能了解到老生的学习经验，让学习的路上不再孤单无助。
            </p>
            <p>基于上述的想法，我们团队创建了<strong>「 CS.DEEP 搬砖技术论坛 」</strong>这样一个面向计算机领域学习的在线交流论坛。<strong>
                小DEEP&nbsp;</strong>出生于华南师大，希望为来自各地高校、企业、中小学的计算机爱好者们提供一个在线交流平台。
            </p>
            <p>
              成为计算机爱好者学习工作生活的一部分一直是<strong>CS.DEEP</strong>的不懈追求，当前<strong>小DEEP</strong>主要面向以下两类人群提供连接和支撑：
            </p>
            <p class="icon">
              <span><i class="iconfont icon-zhuanjia"></i> <strong>&nbsp; 计算机学习者：</strong>通识教育、学习方法养成，CS 领域从入门到进阶</span>
              <span><i class="iconfont icon-keyan"></i><strong>&nbsp;&nbsp;&nbsp;IT相关工作、科研人员</strong>：业余技术精进、行业经验交流</span>
            </p>

            <p>我们致力于：</p>
            <div class="decorate">
              <p>为计算机爱好者们营造专注学习讨论的氛围，帮助计算机爱好者们更好融入计算机科学领域的学习探索，在沉淀与交流中持续成长。</p>
            </div>
          </div>

          <div class="core">
            <h2>核心业务</h2>
            <p>目前 CS.CEEP 的核心业务主要分三块：<strong>网站建设</strong>、<strong>交流社群</strong>、<strong>小聚活动</strong>。</p>
            <div class="production">
              <h3>1.网站建设</h3>
              <ul>
                <li>
                  <router-link to="/"><strong>DS.CEEP 主站: </strong></router-link>
                  聚焦相对更严肃专业的技术话题分享、讨论，让讨论有所沉淀、做到开放与可被检索
                </li>
                <li>
                  <strong>DEEP-ui: </strong>
                  团队研发基于vue3的开源UI组件库，致力于提供更好的开源组件！( <i class="iconfont icon-yanghuguanli"></i>施工中...)
                </li>
                <li>
                  <strong>DS.CEEP Wiki:</strong>着力于 CS 本科阶段的公共知识库的构建，沉淀社区成员在计算机学习中积累的有用经验，提供入门到进阶的导览、学习指南( <i
                    class="iconfont icon-yanghuguanli"></i>施工中..)
                </li>
                <li>
                  <strong>未来规划: </strong>实现电脑PC端、移动端、小程序多平台的同步……( <i class="iconfont icon-yanghuguanli"></i>施工中...)
                </li>
              </ul>
            </div>
            <div class="communication">
              <h3>2.交流社群( <i class="iconfont icon-yanghuguanli"></i>施工中...)</h3>
              <p>主要分「超级群」与「普通群聊」</p>
              <ul>
                <li><strong>超级群（如Discord）：</strong>正在尝试中的在线社群新形态，可以更好支撑大家的日常讨论</li>
                <li><strong>普通群聊（QQ/微信群）：</strong>方便成员在线上/线下建立联系、更及时的问题求助、日常的活动、约饭等等</li>
              </ul>
            </div>
            <div class="party">
              <h3>3.小聚活动( <i class="iconfont icon-yanghuguanli"></i>施工中)</h3>
              <p>社区成员不定期发起各类技术分享活动，可以模仿 <a href="https://lug.ustc.edu.cn/wiki/lug/events/" style="color: blue;">LUG活动</a>
                的模式，促进成员间的沟通与联络。目前主要为线上会议的形式，会议相关记录会沉淀在视频网站上，也许视情况考虑线下的活动。</p>
              <p>历史活动及新的活动安排参见活动页面。</p>
              <p>鉴于单打独斗的线上自学在进度把控、交流探讨等方面的困难，我们在探索更好的学习模式和方法，结合现代前沿的教育理论，可能会借鉴一些类 Moodle / Canvas / Open Edx 等 LMS
                系统的思路，设计更好的辅助线上自学的氛围。</p>
            </div>
          </div>

          <div class="value">
            <h2>氛围与价值观</h2>
            <ul>
              <li><strong>沉得住气、静得下心，干得下去</strong>
                <p>
                  身处信息量指数化爆炸的时代樊笼里，“世界唾手可得”已然成为不少人对世界的错觉，让人惰于浮躁与焦虑之中，追求速度，忘记了思考，忘记了沉淀。当迷雾散去，现实只剩下一地曾经风中随处飘摇的鸡毛。我们提倡沉得住气，静得下心，干的下去的理念的本质就是宣扬能够尽量挤出大块的专注时间去倾听自己的内心，思考自己遇到的问题，并且不仅仅止于思考，还要把想法付诸于行，干得下去，把执行力拉满，将转瞬即逝的想法实现出来。
                </p>
              </li>
              <li><strong>虚心求教而不自卑</strong>
                <p>
                  人无完人，盲目的崇拜自怜并不是学习之道。看到别人的长处，也要看到别人的短处，不被他人某一单一闪光点而自乱阵脚，无所适从，而是要清楚每个人都有其擅长与局限的地方，取长补短总是自古以来的不二法门。我们鼓励的是“道”——取之以长，补之以短。以谦虚求教为目的，自信自强为方法，正所谓“是故弟子不必不如师，师不必贤于弟子，闻道有先后，术业有专攻，如是而已。”
                </p>
              </li>
              <li><strong>认识交流，学会交流</strong>
                <p>
                  Web时代让“交流”变得触手可及，但并不是每个人都懂得交流。我们鼓励CS.DEEP的论坛成员能够利用好web所提供的开放、平等的平台认识交流，懂得交流，通过URL链接的形式将自己的blog，Handstack
                  Notes在平台上进行分享交流，并借此碰撞出能跨越更多时空的思想与灵感。</p>
                <p>
                  当然不仅仅是note的分享，我们更希望大家能够将交流的深度拓展到开源的层次。通过分享自己“闭门造车”的软件作品及源码，并在web提供的平台上进行深入的学习与讨论，在讨论中完善自己的作品，在完善的过程中激发更多的讨论，在螺旋的讨论——完善的过程中让思维得到拓展与视野得到拓宽。
                </p>
              </li>
              <li><strong>锁定问题的关键</strong>
                <p>
                  “打蛇打七寸”，精准有效往往是解决问题的关键。在我们的软件代码开发的过程中或多或少都会出现各样的bug，这些bug中有的可能只是语法的小错误，有的可能是整个开发架构的错误。这就需要我们多定义问题与多思考问题，在脑海中理清问题的脉络，从而抓住问题的关键，一针见血地解决问题。
                </p>
                <p>
                  探索问题解决方法的过程本身也是值得去记录的，将每一步遇到的“坑”都填好，让发现问题、解决问题的思路达到一个可回溯的程度，这样无论是将来自己或者他人遇到类似的问题都可以有迹可循，虽然我们不是为了达到“走过现在的曲折，从此人生尽是坦途”的程度，但是回溯机制有时确实是很有用的（doge）。
                </p>
              </li>
              <li><strong>仰望星空，脚踏实地</strong>
                <p>
                  “理想很丰满，现实很骨感”往往成为人们对于理想与现实之间差距的经典评价。理想的世界固然美好，但这份美好是建立在现实的基础上的，将对理想的执着化作现实奋斗的动力，生活也会多一分不一样。停唱“明日歌”，但做“务实者”。仰望星空，脚踏实地。

                </p>

              </li>
            </ul>
          </div>

          <div class="name">
            <h2>名称的含义</h2>
            <p>初见「CS.DEEP
              搬砖技术论坛」这一名字，你可能很快就能找到计算机的痕迹——CS，也常常会解读DEEP为计算机领域内的深度学习相关知识。事实上，CS的理解是没错的，我们创建该论坛的初衷本身就是为计算机爱好者提供一个交流平台，而将DEEP单纯的解读为计算机领域的深度学习方向的话则有些偏差了。
            </p>
            <p>其实，这个DEEP内含3个“深”——深交流，深理解，学得有深度。</p>
            <p>“深交流”的意思是，基于我们所构建的开放、平等的论坛平台，成员之间可以进行有深度的交流，而不会因为由于论坛的限制而扼杀了交流，毕竟为计算机爱好者提供一个交流的平台一直是我们的初衷。</p>
            <p>“深理解”的意思是，利用论坛所提供的“深交流”的机会，对某一问题进行深入的探讨，在探讨的过程中遇到更深层的东西，拓宽更深入的视野，获得更深层次的理解的目的。</p>
            <p>“学得有深度”的意思是，基于上述的“深交流”，“深理解”的过程，让学习不再变得纸上谈兵，遥不可及，而是当投入其中后，会发现自己真的学到了东西，并且这种学到的知识是有一定深度的。</p>
            <p> “搬砖” 一方面是 IT 工程师们苦中作乐般自嘲，另一方面，其也是蕴含着一个道理——“即便再宏伟的建筑，最终仍是由一块块砖垒砌而成”，勿在浮沙筑高台。诚然，计算机的学习本身就是
              “聚沙成塔”的过程，无需纠结太多，踏实做好每一件小事、写好每一行代码、让每一 byte 都能充当大厦一颗牢固的钉子。社区的日常讨论与活动，也是围绕着“如何更好搬砖”而展开。</p>
          </div>

          <div class="logo">
            <h2>关于Logo</h2>
            <p>Logo来源于土星的形象，毕竟土星很契合我们团队的初衷——为计算机爱好者提供一块自由、平等、开放、交流的土壤作为探索星辰大海的跳板。</p>
            <p>Logo外围的线代表土星绚丽的星环，而星环形成的本质还是颗粒的高速运动形成的，寓意论坛的点点贡献汇聚成绝美的产物。</p>
            <p>Logo里面的小圈、大圈则是借喻了一个成语“可圈可点”，寄寓了该项目会收到论坛成员的赞誉（doge）。</p>
            <div class="logoImage">

            </div>
            <p class="last">最后仅以一句<strong>"愿你我在顶峰相见"</strong>互勉。</p>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { number } from 'echarts';


export default {
  data() {
    return {
      currentYear: number,
    }
  },
  created() {
    const date = new Date();
    this.currentYear = date.getFullYear();
  },
  name: "AboutUsView"
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.common-layout {
  .el-header {
    padding: 0;
    min-width: 1400px;
    width: 100%;
    height: 118px;
    background-color: #e8ecf3;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;

    .web-intro {
      p {
        font-size: 2rem;
        font-weight: bold;
        color: #667c99;
      }
    }
  }

  .el-main {
    .container {
      // background-color: #667c99;
      font-family: "Times New Roman", "宋体", "sans-serif";
      width: 800px;
      margin-left: auto;
      margin-right: auto;

      h1 {
        margin-top: 10px;
      }

      h2 {
        padding-top: 15px;
        padding-bottom: 3px;
        border-bottom: 2px solid #b3d4fc;
      }

      p {
        font-family: "Times New Roman", "宋体", "sans-serif";
        margin-top: 20px;
        line-height: 30px;
        font-size: 17px;

        &:first-of-type {
          span {
            font-weight: bold;
          }
        }
      }

      .what {
        margin-top: 35px;

        .icon {
          i {
            color: #1976d2;
          }

          span {
            display: block;
            padding-left: 20px;
          }
        }

        .decorate {
          margin-top: 15px;
          background-color: #e8ecf3;
          padding: 10px 10px;
          border: 2px dashed #667c99;

          p {
            margin-top: 0;
            color: #668abc;
          }
        }
      }

      .core {
        margin-top: 15px;

        p {
          margin: 14px 0;
        }

        .production {
          margin: 26px 0 16px 0;

          ul {
            margin: 10px 0px 0px 40px;
            font-size: 15px;

            li {
              margin: 5px 0;
              line-height: 25px;

              strong {
                color: black;
              }
            }
          }
        }

        .communication {
          margin: 26px 0 16px 0;

          p {
            margin: 10px 0;
          }

          ul {
            margin-left: 40px;
            font-size: 15px;

            li {
              margin-top: 5px;
              line-height: 25px;

              strong {
                color: black;
              }
            }
          }
        }

        .party {
          margin: 26px 0 16px 0;

        }
      }

      .value {
        p {
          margin-top: 8px;
        }

        ul {
          padding-top: 5px;
          font-size: 15px;
          margin-left: 40px;

          li {
            margin-top: 10px;
            line-height: 25px;

            strong {
              font-size: 16px;
            }

            p {
              font-size: 16px;
            }
          }
        }
      }

      .name {
        margin-top: 10px;
      }

      .logo {
        margin-top: 10px;

        .last::first-letter {
          font-size: 30px;
          font-weight: 700;
        }

        p {
          margin-top: 10px;
        }

        .logoImage {
          margin: 20px auto;
          width: 100px;
          height: 100px;
          background-image: url("../../assets/image/forum.png");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
      }


      .copyRight {
        margin: 0 auto;
        width: 50%;
        // background-color: #265faf;
        display: flex;
        align-items: center;
        justify-content: center;
      }


    }
  }
}
</style>
