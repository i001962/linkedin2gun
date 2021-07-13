;(function(){

    /* UNBUILD */
    function USE(arg, req){
      return req? require(arg) : arg.slice? USE[R(arg)] : function(mod, path){
        arg(mod = {exports: {}});
        USE[R(path)] = mod.exports;
      }
      function R(p){
        return p.split('/').slice(-1).toString().replace('.js','');
      }
    }
    if(typeof module !== "undefined"){ var MODULE = module }
    /* UNBUILD */
  
      ;USE(function(module){
          // Shim for generic javascript utilities.
          String.random = function(l, c){
              var s = '';
              l = l || 24; // you are not going to make a 0 length random number, so no need to check type
              c = c || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz';
              while(l-- > 0){ s += c.charAt(Math.floor(Math.random() * c.length)) }
              return s;
          }
          String.match = function(t, o){ var tmp, u;
              if('string' !== typeof t){ return false }
              if('string' == typeof o){ o = {'=': o} }
              o = o || {};
              tmp = (o['='] || o['*'] || o['>'] || o['<']);
              if(t === tmp){ return true }
              if(u !== o['=']){ return false }
              tmp = (o['*'] || o['>']);
              if(t.slice(0, (tmp||'').length) === tmp){ return true }
              if(u !== o['*']){ return false }
              if(u !== o['>'] && u !== o['<']){
                  return (t >= o['>'] && t <= o['<'])? true : false;
              }
              if(u !== o['>'] && t >= o['>']){ return true }
              if(u !== o['<'] && t <= o['<']){ return true }
              return false;
          }
          String.hash = function(s, c){ // via SO
              if(typeof s !== 'string'){ return }
          c = c || 0; // CPU schedule hashing by
          if(!s.length){ return c }
          for(var i=0,l=s.length,n; i<l; ++i){
            n = s.charCodeAt(i);
            c = ((c<<5)-c)+n;
            c |= 0;
          }
          return c;
        }
          var has = Object.prototype.hasOwnProperty;
          Object.plain = function(o){ return o? (o instanceof Object && o.constructor === Object) || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === 'Object' : false }
          Object.empty = function(o, n){
              for(var k in o){ if(has.call(o, k) && (!n || -1==n.indexOf(k))){ return false } }
              return true;
          }
          Object.keys = Object.keys || function(o){
              var l = [];
              for(var k in o){ if(has.call(o, k)){ l.push(k) } }
              return l;
          }
          ;(function(){ // max ~1ms or before stack overflow 
              var u, sT = setTimeout, l = 0, c = 0, sI = (typeof setImmediate !== ''+u && setImmediate) || sT;
              sT.poll = sT.poll || function(f){
                  if((1 >= (+new Date - l)) && c++ < 3333){ f(); return }
                  sI(function(){ l = +new Date; f() },c=0)
              }
          }());
          ;(function(){ // Too many polls block, this "threads" them in turns over a single thread in time.
              var sT = setTimeout, t = sT.turn = sT.turn || function(f){ 1 == s.push(f) && p(T) }
              , s = t.s = [], p = sT.poll, i = 0, f, T = function(){
                  if(f = s[i++]){ f() }
                  if(i == s.length || 99 == i){
                      s = t.s = s.slice(i);
                      i = 0;
                  }
                  if(s.length){ p(T) }
              }
          }());
          ;(function(){
              var u, sT = setTimeout, T = sT.turn;
              sT.each = sT.each || function(l,f,e,S){ S = S || 9; (function t(s,L,r){
                if(L = (s = (l||[]).splice(0,S)).length){
                    for(var i = 0; i < L; i++){
                        if(u !== (r = f(s[i]))){ break }
                    }
                    if(u === r){ T(t); return }
                } e && e(r);
              }())}
          }());
      })(USE, './shim');
  
      ;USE(function(module){
          // On event emitter generic javascript utility.
          module.exports = function onto(tag, arg, as){
              if(!tag){ return {to: onto} }
              var u, f = 'function' == typeof arg, tag = (this.tag || (this.tag = {}))[tag] || f && (
                  this.tag[tag] = {tag: tag, to: onto._ = { next: function(arg){ var tmp;
                      if(tmp = this.to){ tmp.next(arg) }
              }}});
              if(f){
                  var be = {
                      off: onto.off ||
                      (onto.off = function(){
                          if(this.next === onto._.next){ return !0 }
                          if(this === this.the.last){
                              this.the.last = this.back;
                          }
                          this.to.back = this.back;
                          this.next = onto._.next;
                          this.back.to = this.to;
                          if(this.the.last === this.the){
                              delete this.on.tag[this.the.tag];
                          }
                      }),
                      to: onto._,
                      next: arg,
                      the: tag,
                      on: this,
                      as: as,
                  };
                  (be.back = tag.last || tag).to = be;
                  return tag.last = be;
              }
              if((tag = tag.to) && u !== arg){ tag.next(arg) }
              return tag;
          };
      })(USE, './onto');
  
      ;USE(function(module){
          USE('./shim');
          module.exports = function(v){ // Valid values are a subset of JSON: null, binary, number (!Infinity), text, or a soul relation. Arrays need special algorithms to handle concurrency, so they are not supported directly. Use an extension that supports them if needed but research their problems first.
              if(v === undefined){ return false }
              if(v === null){ return true } // "deletes", nulling out keys.
              if(v === Infinity){ return false } // we want this to be, but JSON does not support it, sad face.
              if(v !== v){ return false } // can you guess what this checks for? ;)
              if('string' == typeof v // text!
              || 'boolean' == typeof v
              || 'number' == typeof v){
                  return true; // simple values are valid.
              }
              if(v && ('string' == typeof (v['#']||0)) && Object.empty(v, ['#'])){ return v['#'] } // is link
              return false; // If not, everything else remaining is an invalid data type. Custom extensions can be built on top of these primitives to support other types.
          }
      })(USE, './valid');
  
      ;USE(function(module){
          USE('./shim');
          function State(){
              var t = +new Date;
              if(last < t){
                  return N = 0, last = t + State.drift;
              }
              return last = t + ((N += 1) / D) + State.drift;
          }
          State.drift = 0;
          var NI = -Infinity, N = 0, D = 999, last = NI, u; // WARNING! In the future, on machines that are D times faster than 2016AD machines, you will want to increase D by another several orders of magnitude so the processing speed never out paces the decimal resolution (increasing an integer effects the state accuracy).
          State.is = function(n, k, o){ // convenience function to get the state on a key on a node and return it.
              var tmp = (k && n && n._ && n._['>']) || o;
              if(!tmp){ return }
              return ('number' == typeof (tmp = tmp[k]))? tmp : NI;
          }
          State.ify = function(n, k, s, v, soul){ // put a key's state on a node.
              (n = n || {})._ = n._ || {}; // safety check or init.
              if(soul){ n._['#'] = soul } // set a soul if specified.
              var tmp = n._['>'] || (n._['>'] = {}); // grab the states data.
              if(u !== k && k !== '_'){
                  if('number' == typeof s){ tmp[k] = s } // add the valid state.
                  if(u !== v){ n[k] = v } // Note: Not its job to check for valid values!
              }
              return n;
          }
          module.exports = State;
      })(USE, './state');
  
      ;USE(function(module){
          USE('./shim');
          function Dup(opt){
              var dup = {s:{}}, s = dup.s;
              opt = opt || {max: 999, age: 1000 * 9};//*/ 1000 * 9 * 3};
              dup.check = function(id){
                  if(!s[id]){ return false }
                  return dt(id);
              }
              var dt = dup.track = function(id){
                  var it = s[id] || (s[id] = {});
                  it.was = dup.now = +new Date;
                  if(!dup.to){ dup.to = setTimeout(dup.drop, opt.age + 9) }
                  return it;
              }
              dup.drop = function(age){
                  dup.to = null;
                  dup.now = +new Date;
                  var l = Object.keys(s);
                  console.STAT && console.STAT(dup.now, +new Date - dup.now, 'dup drop keys'); // prev ~20% CPU 7% RAM 300MB // now ~25% CPU 7% RAM 500MB
                  setTimeout.each(l, function(id){ var it = s[id]; // TODO: .keys( is slow?
                      if(it && (age || opt.age) > (dup.now - it.was)){ return }
                      delete s[id];
                  },0,99);
              }
              return dup;
          }
          module.exports = Dup;
      })(USE, './dup');
  
      ;USE(function(module){
          // request / response module, for asking and acking messages.
          USE('./onto'); // depends upon onto!
          module.exports = function ask(cb, as){
              if(!this.on){ return }
              if(!('function' == typeof cb)){
                  if(!cb){ return }
                  var id = cb['#'] || cb, tmp = (this.tag||'')[id];
                  if(!tmp){ return }
                  if(as){
                      tmp = this.on(id, as);
                      clearTimeout(tmp.err);
                  }
                  return true;
              }
              var id = (as && as['#']) || Math.random().toString(36).slice(2);
              if(!cb){ return id }
              var to = this.on(id, cb, as);
              to.err = to.err || setTimeout(function(){
                  to.next({err: "Error: No ACK yet.", lack: true});
                  to.off();
              }, (this.opt||{}).lack || 9000);
              return id;
          }
      })(USE, './ask');
  
      ;USE(function(module){
  
          function Gun(o){
              if(o instanceof Gun){ return (this._ = {$: this}).$ }
              if(!(this instanceof Gun)){ return new Gun(o) }
              return Gun.create(this._ = {$: this, opt: o});
          }
  
          Gun.is = function($){ return ($ instanceof Gun) || ($ && $._ && ($ === $._.$)) || false }
  
          Gun.version = 0.2020;
  
          Gun.chain = Gun.prototype;
          Gun.chain.toJSON = function(){};
  
          USE('./shim');
          Gun.valid = USE('./valid');
          Gun.state = USE('./state');
          Gun.on = USE('./onto');
          Gun.dup = USE('./dup');
          Gun.ask = USE('./ask');
  
          ;(function(){
              Gun.create = function(at){
                  at.root = at.root || at;
                  at.graph = at.graph || {};
                  at.on = at.on || Gun.on;
                  at.ask = at.ask || Gun.ask;
                  at.dup = at.dup || Gun.dup();
                  var gun = at.$.opt(at.opt);
                  if(!at.once){
                      at.on('in', universe, at);
                      at.on('out', universe, at);
                      at.on('put', map, at);
                      Gun.on('create', at);
                      at.on('create', at);
                  }
                  at.once = 1;
                  return gun;
              }
              function universe(msg){
                  if(!msg){ return }
                  if(msg.out === universe){ this.to.next(msg); return }
                  var eve = this, as = eve.as, at = as.at || as, gun = at.$, dup = at.dup, tmp, DBG = msg.DBG;
                  (tmp = msg['#']) || (tmp = msg['#'] = text_rand(9));
                  if(dup.check(tmp)){ return } dup.track(tmp);
                  tmp = msg._; msg._ = ('function' == typeof tmp)? tmp : function(){};
                  (msg.$ && (msg.$ === (msg.$._||'').$)) || (msg.$ = gun);
                  if(msg['@'] && !msg.put){ ack(msg) }
                  if(!at.ask(msg['@'], msg)){ // is this machine listening for an ack?
                      DBG && (DBG.u = +new Date);
                      if(msg.put){ put(msg); return } else
                      if(msg.get){ Gun.on._get(msg, gun) }
                  }
                  DBG && (DBG.uc = +new Date);
                  eve.to.next(msg);
                  DBG && (DBG.ua = +new Date);
                  if(msg.nts || msg.NTS){ return } // TODO: This shouldn't be in core, but fast way to prevent NTS spread. Delete this line after all peers have upgraded to newer versions.
                  msg.out = universe; at.on('out', msg);
                  DBG && (DBG.ue = +new Date);
              }
              function put(msg){
                  if(!msg){ return }
                  var ctx = msg._||'', root = ctx.root = ((ctx.$ = msg.$||'')._||'').root;
                  if(msg['@'] && ctx.faith && !ctx.miss){ // TODO: AXE may split/route based on 'put' what should we do here? Detect @ in AXE? I think we don't have to worry, as DAM will route it on @.
                      msg.out = universe;
                      root.on('out', msg);
                      return;
                  }
                  ctx.latch = root.hatch; ctx.match = root.hatch = [];
                  var put = msg.put;
                  var DBG = ctx.DBG = msg.DBG, S = +new Date;
                  if(put['#'] && put['.']){ /*root && root.on('put', msg);*/ return } // TODO: BUG! This needs to call HAM instead.
                  DBG && (DBG.p = S);
                  ctx['#'] = msg['#'];
                  ctx.msg = msg;
                  ctx.all = 0;
                  ctx.stun = 1;
                  var nl = Object.keys(put);//.sort(); // TODO: This is unbounded operation, large graphs will be slower. Write our own CPU scheduled sort? Or somehow do it in below? Keys itself is not O(1) either, create ES5 shim over ?weak map? or custom which is constant.
                  console.STAT && console.STAT(S, ((DBG||ctx).pk = +new Date) - S, 'put sort');
                  var ni = 0, nj, kl, soul, node, states, err, tmp;
                  (function pop(o){
                      if(nj != ni){ nj = ni;
                          if(!(soul = nl[ni])){
                              console.STAT && console.STAT(S, ((DBG||ctx).pd = +new Date) - S, 'put');
                              fire(ctx);
                              return;
                          }
                          if(!(node = put[soul])){ err = ERR+cut(soul)+"no node." } else
                          if(!(tmp = node._)){ err = ERR+cut(soul)+"no meta." } else
                          if(soul !== tmp['#']){ err = ERR+cut(soul)+"soul not same." } else
                          if(!(states = tmp['>'])){ err = ERR+cut(soul)+"no state." }
                          kl = Object.keys(node||{}); // TODO: .keys( is slow
                      }
                      if(err){
                          msg.err = ctx.err = err; // invalid data should error and stun the message.
                          fire(ctx);
                          //console.log("handle error!", err) // handle!
                          return;
                      }
                      var i = 0, key; o = o || 0;
                      while(o++ < 9 && (key = kl[i++])){
                          if('_' === key){ continue }
                          var val = node[key], state = states[key];
                          if(u === state){ err = ERR+cut(key)+"on"+cut(soul)+"no state."; break }
                          if(!valid(val)){ err = ERR+cut(key)+"on"+cut(soul)+"bad "+(typeof val)+cut(val); break }
                          //ctx.all++; //ctx.ack[soul+key] = '';
                          ham(val, key, soul, state, msg);
                      }
                      if((kl = kl.slice(i)).length){ turn(pop); return }
                      ++ni; kl = null; pop(o);
                  }());
              } Gun.on.put = put;
              console.log("BEWARE: BETA VERSION OF NEW GUN! NOT ALL FEATURES FINISHED!");
              function ham(val, key, soul, state, msg){
                  var ctx = msg._||'', root = ctx.root, graph = root.graph, lot, tmp;
                  var vertex = graph[soul] || empty, was = state_is(vertex, key, 1), known = vertex[key];
  
                  if(tmp = console.STAT){ if(!graph[soul] || !known){ tmp.has = (tmp.has || 0) + 1 } }
  
                  var now = State(),u;
                  if(state > now){ /*console.log("setTo");*/ /*setTo;*/ return } // TODO: BUG!!!!
                  if(state < was){ /*console.log("old");*/ /*old;*/ if(!ctx.miss){ return } } // but some chains have a cache miss that need to re-fire. // TODO: Improve in future. // for AXE this would reduce rebroadcast, but GUN does it on message forwarding.
                  if(!ctx.faith){ // TODO: BUG? Can this be used for cache miss as well?
                      if(state === was && (val === known || L(val) <= L(known))){ /*console.log("same");*/ /*same;*/ return } // same
                  }
                  /*if(!is.incoming){
                      if(is.defer){
                          var to = state - machine;
                          setTimeout(function(){
                              ham(val, key, soul, state, msg);
                          }, to > MD? MD : to); // setTimeout Max Defer 32bit :(
                          if(!ctx.to){ root.on('in', {'@': msg['#'], err: to}) } ctx.to = 1; // TODO: This causes too many problems unless sending peers auto-retry.
                          return to;
                      }
                      return;
                  }*/
                  //ctx.all++;
                  ctx.stun++; // TODO: 'forget' feature in SEA tied to this, bad approach, but hacked in for now. Any changes here must update there.
                  var aid = msg['#']+ctx.all++, id = {toString: function(){ return aid }, _: ctx}; // this *trick* makes it compatible between old & new versions.
                  var DBG = ctx.DBG; DBG && (DBG.ph = DBG.ph || +new Date);
                  root.on('put', {'#': id, '@': msg['@'], put: {'#': soul, '.': key, ':': val, '>': state}, _: ctx});
              }
              function map(msg){
                  var DBG; if(DBG = (msg._||'').DBG){ DBG.pa = +new Date; DBG.pm = DBG.pm || +new Date}
            var eve = this, root = eve.as, graph = root.graph, ctx = msg._, put = msg.put, soul = put['#'], key = put['.'], val = put[':'], state = put['>'], id = msg['#'], tmp;
            if((tmp = ctx.msg) && (tmp = tmp.put) && (tmp = tmp[soul])){ state_ify(tmp, key, state, val, soul) } // necessary! or else out messages do not get SEA transforms.
                  graph[soul] = state_ify(graph[soul], key, state, val, soul);
                  if(tmp = (root.next||'')[soul]){ tmp.on('in', msg) }
                  eve.to.next(msg);
                  fire(ctx);
              }
              function fire(ctx, msg){ var root;
                  if(ctx.stop){ return }
                  if(--ctx.stun !== 0 && !ctx.err){ return } // TODO: 'forget' feature in SEA tied to this, bad approach, but hacked in for now. Any changes here must update there.
                  ctx.stop = 1;
                  if(!(root = ctx.root)){ return }
                  var tmp = ctx.match; tmp.end = 1;
                  if(tmp === root.hatch){ if(!(tmp = ctx.latch) || tmp.end){ delete root.hatch } else { root.hatch = tmp } }
                  ctx.hatch && ctx.hatch(); // TODO: rename/rework how put & this interact.
                  setTimeout.each(ctx.match, function(cb){cb && cb()}); 
                  if(!(msg = ctx.msg) || ctx.err || msg.err){ return }
                  msg.out = universe;
                  ctx.root.on('out', msg);
              }
              function ack(msg){ // aggregate ACKs.
                  var id = msg['@'] || '', root = (msg.$._||'').root, tmp;
                  // TODO: check for the sharded message err and transfer it onto the original batch?
                  if(!(tmp = id._)){ /*console.log("TODO: handle ack id.");*/ return }
                  tmp.acks = (tmp.acks||0) + 1;
                  if(0 == tmp.stun && tmp.acks == tmp.all){ // TODO: if ack is synchronous this may not work?
                      root && root.on('in', {'@': tmp['#'], err: msg.err, ok: 'shard'});
                  }
              }
  
              var ERR = "Error: Invalid graph!";
              var cut = function(s){ return " '"+(''+s).slice(0,9)+"...' " }
              var L = JSON.stringify, MD = 2147483647, State = Gun.state;
  
          }());
  
          ;(function(){
              Gun.on._get = function(msg, gun){
                  var root = gun._, get = msg.get, soul = get['#'], node = root.graph[soul], has = get['.'], tmp;
                  var next = root.next || (root.next = {}), at = next[soul];
                  // queue concurrent GETs?
                  // TODO: consider tagging original message into dup for DAM.
                  // TODO: ^ above? In chat app, 12 messages resulted in same peer asking for `#user.pub` 12 times. (same with #user GET too, yipes!) // DAM note: This also resulted in 12 replies from 1 peer which all had same ##hash but none of them deduped because each get was different.
                  // TODO: localStorage reply did not get chunked.
                  // TODO: Moving quick hacks fixing these things to axe for now.
                  // TODO: a lot of GET #foo then GET #foo."" happening, why?
                  // TODO: DAM's ## hash check, on same get ACK, producing multiple replies still, maybe JSON vs YSON?
                  // TMP note for now: viMZq1slG was chat LEX query #.
                  /*if(gun !== (tmp = msg.$) && (tmp = (tmp||'')._)){
                      if(tmp.Q){ tmp.Q[msg['#']] = ''; return } // chain does not need to ask for it again.
                      tmp.Q = {};
                  }*/
                  /*if(u === has){
                      if(at.Q){
                          //at.Q[msg['#']] = '';
                          //return;
                      }
                      at.Q = {};
                  }*/
                  var ctx = msg._||{}, DBG = ctx.DBG = msg.DBG;
                  DBG && (DBG.g = +new Date);
                  //console.log("GET:", get, node, has);
                  if(!node){ return root.on('get', msg) }
                  if(has){
                      if('string' != typeof has || u === node[has]){ return root.on('get', msg) }
                      node = state_ify({}, has, state_is(node, has), node[has], soul);
                      // If we have a key in-memory, do we really need to fetch?
                      // Maybe... in case the in-memory key we have is a local write
                      // we still need to trigger a pull/merge from peers.
                  }
                  //Gun.window? Gun.obj.copy(node) : node; // HNPERF: If !browser bump Performance? Is this too dangerous to reference root graph? Copy / shallow copy too expensive for big nodes. Gun.obj.to(node); // 1 layer deep copy // Gun.obj.copy(node); // too slow on big nodes
                  var S = +new Date;
                  var ack = msg['#'], id = text_rand(9), keys = Object.keys(node||'').sort(), soul = ((node||'')._||'')['#'], kl = keys.length, j = 0;
                  console.STAT && console.STAT(S, ((DBG||ctx).gk = +new Date) - S, 'got keys');
                  // PERF: Consider commenting this out to force disk-only reads for perf testing? // TODO: .keys( is slow
                  node && (function got(){
                      S = +new Date;
                      var i = 0, k, put = {};
                      while(i < 9 && (k = keys[i++])){
                          state_ify(put, k, state_is(node, k), node[k], soul);
                      }
                      keys = keys.slice(i);
                      (tmp = {})[soul] = put; put = tmp;
                      var faith = function(){}; faith.ram = faith.faith = true; // HNPERF: We're testing performance improvement by skipping going through security again, but this should be audited.
                      tmp = keys.length;
                      console.STAT && console.STAT(S, -(S - (S = +new Date)), 'got copied some');
                      DBG && (DBG.ga = +new Date);
                      root.on('in', {'@': ack, '#': id, put: put, '%': (tmp? (id = text_rand(9)) : u), ram: 1, $: gun, _: faith, DBG: DBG});
                      console.STAT && console.STAT(S, +new Date - S, 'got in');
                      //root.on('in', {'@': ack, '#': text_rand(9), put: put, '%': tmp? ((j+=i)+'/'+kl) : u, ram: 1, $: gun, _: faith}); console.log("???", j+'/'+kl);
                      if(!tmp){ return }
                      setTimeout.turn(got);
                  }());
                  root.on('get', msg); // send GET to storage adapters.
              }
          }());
  
          ;(function(){
              Gun.chain.opt = function(opt){
                  opt = opt || {};
                  var gun = this, at = gun._, tmp = opt.peers || opt;
                  if(!Object.plain(opt)){ opt = {} }
                  if(!Object.plain(at.opt)){ at.opt = opt }
                  if('string' == typeof tmp){ tmp = [tmp] }
                  if(tmp instanceof Array){
                      if(!Object.plain(at.opt.peers)){ at.opt.peers = {}}
                      tmp.forEach(function(url){
                          var p = {}; p.id = p.url = url;
                          at.opt.peers[url] = at.opt.peers[url] || p;
                      })
                  }
                  at.opt.peers = at.opt.peers || {};
                  obj_each(opt, function each(k){ var v = this[k];
                      if((this && this.hasOwnProperty(k)) || 'string' == typeof v || Object.empty(v)){ this[k] = v; return }
                      if(v && v.constructor !== Object && !(v instanceof Array)){ return }
                      obj_each(v, each);
                  });
                  Gun.on('opt', at);
                  at.opt.uuid = at.opt.uuid || function uuid(l){ return Gun.state().toString(36).replace('.','') + String.random(l||12) }
                  return gun;
              }
          }());
  
          var obj_each = function(o,f){ Object.keys(o).forEach(f,o) }, text_rand = String.random, turn = setTimeout.turn, valid = Gun.valid, state_is = Gun.state.is, state_ify = Gun.state.ify, u, empty = {}, C;
  
          Gun.log = function(){ return (!Gun.log.off && C.log.apply(C, arguments)), [].slice.call(arguments).join(' ') };
          Gun.log.once = function(w,s,o){ return (o = Gun.log.once)[w] = o[w] || 0, o[w]++ || Gun.log(s) };
  
          if(typeof window !== "undefined"){ (window.GUN = window.Gun = Gun).window = window }
          try{ if(typeof MODULE !== "undefined"){ MODULE.exports = Gun } }catch(e){}
          module.exports = Gun;
          
          (Gun.window||{}).console = (Gun.window||{}).console || {log: function(){}};
          (C = console).only = function(i, s){ return (C.only.i && i === C.only.i && C.only.i++) && (C.log.apply(C, arguments) || s) };
  
          ;"Please do not remove welcome log unless you are paying for a monthly sponsorship, thanks!";
          Gun.log.once("welcome", "Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!");
      })(USE, './root');
  
      ;USE(function(module){
          var Gun = USE('./root');
          Gun.chain.back = function(n, opt){ var tmp;
              n = n || 1;
              if(-1 === n || Infinity === n){
                  return this._.root.$;
              } else
              if(1 === n){
                  return (this._.back || this._).$;
              }
              var gun = this, at = gun._;
              if(typeof n === 'string'){
                  n = n.split('.');
              }
              if(n instanceof Array){
                  var i = 0, l = n.length, tmp = at;
                  for(i; i < l; i++){
                      tmp = (tmp||empty)[n[i]];
                  }
                  if(u !== tmp){
                      return opt? gun : tmp;
                  } else
                  if((tmp = at.back)){
                      return tmp.$.back(n, opt);
                  }
                  return;
              }
              if('function' == typeof n){
                  var yes, tmp = {back: at};
                  while((tmp = tmp.back)
                  && u === (yes = n(tmp, opt))){}
                  return yes;
              }
              if('number' == typeof n){
                  return (at.back || at).$.back(n - 1);
              }
              return this;
          }
          var empty = {}, u;
      })(USE, './back');
  
      ;USE(function(module){
          // WARNING: GUN is very simple, but the JavaScript chaining API around GUN
          // is complicated and was extremely hard to build. If you port GUN to another
          // language, consider implementing an easier API to build.
          var Gun = USE('./root');
          Gun.chain.chain = function(sub){
              var gun = this, at = gun._, chain = new (sub || gun).constructor(gun), cat = chain._, root;
              cat.root = root = at.root;
              cat.id = ++root.once;
              cat.back = gun._;
              cat.on = Gun.on;
              cat.on('in', Gun.on.in, cat); // For 'in' if I add my own listeners to each then I MUST do it before in gets called. If I listen globally for all incoming data instead though, regardless of individual listeners, I can transform the data there and then as well.
              cat.on('out', Gun.on.out, cat); // However for output, there isn't really the global option. I must listen by adding my own listener individually BEFORE this one is ever called.
              return chain;
          }
  
          function output(msg){
              var put, get, at = this.as, back = at.back, root = at.root, tmp;
              if(!msg.$){ msg.$ = at.$ }
              this.to.next(msg);
              if(get = msg.get){
                  /*if(u !== at.put){
                      at.on('in', at);
                      return;
                  }*/
                  if(root.pass){ root.pass[at.id] = at; } // will this make for buggy behavior elsewhere?
                  if(at.lex){ Object.keys(at.lex).forEach(function(k){ tmp[k] = at.lex[k] }, tmp = msg.get = msg.get || {}) }
                  if(get['#'] || at.soul){
                      get['#'] = get['#'] || at.soul;
                      msg['#'] || (msg['#'] = text_rand(9)); // A3120 ?
                      back = (root.$.get(get['#'])._);
                      if(!(get = get['.'])){ // soul
                          tmp = back.ask && back.ask['']; // check if we have already asked for the full node
                          (back.ask || (back.ask = {}))[''] = back; // add a flag that we are now.
                          if(u !== back.put){ // if we already have data,
                              back.on('in', back); // send what is cached down the chain
                              if(tmp){ return } // and don't ask for it again.
                          }
                          msg.$ = back.$;
                      } else
                      if(obj_has(back.put, get)){ // TODO: support #LEX !
                          tmp = back.ask && back.ask[get];
                          (back.ask || (back.ask = {}))[get] = back.$.get(get)._;
                          back.on('in', {get: get, put: {'#': back.soul, '.': get, ':': back.put[get], '>': state_is(root.graph[back.soul], get)}});
                          if(tmp){ return }
                      }
                          /*put = (back.$.get(get)._);
                          if(!(tmp = put.ack)){ put.ack = -1 }
                          back.on('in', {
                              $: back.$,
                              put: Gun.state.ify({}, get, Gun.state(back.put, get), back.put[get]),
                              get: back.get
                          });
                          if(tmp){ return }
                      } else
                      if('string' != typeof get){
                          var put = {}, meta = (back.put||{})._;
                          Gun.obj.map(back.put, function(v,k){
                              if(!Gun.text.match(k, get)){ return }
                              put[k] = v;
                          })
                          if(!Gun.obj.empty(put)){
                              put._ = meta;
                              back.on('in', {$: back.$, put: put, get: back.get})
                          }
                          if(tmp = at.lex){
                              tmp = (tmp._) || (tmp._ = function(){});
                              if(back.ack < tmp.ask){ tmp.ask = back.ack }
                              if(tmp.ask){ return }
                              tmp.ask = 1;
                          }
                      }
                      */
                      root.ask(ack, msg); // A3120 ?
                      return root.on('in', msg);
                  }
                  //if(root.now){ root.now[at.id] = root.now[at.id] || true; at.pass = {} }
                  if(get['.']){
                      if(at.get){
                          msg = {get: {'.': at.get}, $: at.$};
                          (back.ask || (back.ask = {}))[at.get] = msg.$._; // TODO: PERFORMANCE? More elegant way?
                          return back.on('out', msg);
                      }
                      msg = {get: at.lex? msg.get : {}, $: at.$};
                      return back.on('out', msg);
                  }
                  (at.ask || (at.ask = {}))[''] = at;	 //at.ack = at.ack || -1;
                  if(at.get){
                      get['.'] = at.get;
                      (back.ask || (back.ask = {}))[at.get] = msg.$._; // TODO: PERFORMANCE? More elegant way?
                      return back.on('out', msg);
                  }
              }
              return back.on('out', msg);
          }; Gun.on.out = output;
  
          function input(msg, cat){ cat = cat || this.as; // TODO: V8 may not be able to optimize functions with different parameter calls, so try to do benchmark to see if there is any actual difference.
              var root = cat.root, gun = msg.$ || (msg.$ = cat.$), at = (gun||'')._ || empty, tmp = msg.put||'', soul = tmp['#'], key = tmp['.'], change = (u !== tmp['='])? tmp['='] : tmp[':'], state = tmp['>'] || -Infinity, sat; // eve = event, at = data at, cat = chain at, sat = sub at (children chains).
              if(u !== msg.put && (u === tmp['#'] || u === tmp['.'] || (u === tmp[':'] && u === tmp['=']) || u === tmp['>'])){ // convert from old format
                  if(!valid(tmp)){
                      if(!(soul = ((tmp||'')._||'')['#'])){ console.log("chain not yet supported for", tmp, '...', msg, cat); return; }
                      gun = cat.root.$.get(soul);
                      return setTimeout.each(Object.keys(tmp).sort(), function(k){ // TODO: .keys( is slow // BUG? ?Some re-in logic may depend on this being sync?
                          if('_' == k || u === (state = state_is(tmp, k))){ return }
                          cat.on('in', {$: gun, put: {'#': soul, '.': k, '=': tmp[k], '>': state}, VIA: msg});
                      });
                  }
                  cat.on('in', {$: at.back.$, put: {'#': soul = at.back.soul, '.': key = at.has || at.get, '=': tmp, '>': state_is(at.back.put, key)}, via: msg}); // TODO: This could be buggy! It assumes/approxes data, other stuff could have corrupted it.
                  return;
              }
              if((msg.seen||'')[cat.id]){ return } (msg.seen || (msg.seen = function(){}))[cat.id] = cat; // help stop some infinite loops
  
              if(cat !== at){ // don't worry about this when first understanding the code, it handles changing contexts on a message. A soul chain will never have a different context.
                  Object.keys(msg).forEach(function(k){ tmp[k] = msg[k] }, tmp = {}); // make copy of message
                  tmp.get = cat.get || tmp.get;
                  if(!cat.soul && !cat.has){ // if we do not recognize the chain type
                      tmp.$$$ = tmp.$$$ || cat.$; // make a reference to wherever it came from.
                  } else
                  if(at.soul){ // a has (property) chain will have a different context sometimes if it is linked (to a soul chain). Anything that is not a soul or has chain, will always have different contexts.
                      tmp.$ = cat.$;
                      tmp.$$ = tmp.$$ || at.$;
                  }
                  msg = tmp; // use the message with the new context instead;
              }
              unlink(msg, cat);
  
              if(((cat.soul/* && (cat.ask||'')['']*/) || msg.$$) && state >= state_is(root.graph[soul], key)){ // The root has an in-memory cache of the graph, but if our peer has asked for the data then we want a per deduplicated chain copy of the data that might have local edits on it.
                  (tmp = root.$.get(soul)._).put = state_ify(tmp.put, key, state, change, soul);
              }
              if(!at.soul /*&& (at.ask||'')['']*/ && state >= state_is(root.graph[soul], key) && (sat = (root.$.get(soul)._.next||'')[key])){ // Same as above here, but for other types of chains. // TODO: Improve perf by preventing echoes recaching.
                  sat.put = change; // update cache
                  if('string' == typeof (tmp = valid(change))){
                      sat.put = root.$.get(tmp)._.put || change; // share same cache as what we're linked to.
                  }
              }
  
              this.to && this.to.next(msg); // 1st API job is to call all chain listeners.
              // TODO: Make input more reusable by only doing these (some?) calls if we are a chain we recognize? This means each input listener would be responsible for when listeners need to be called, which makes sense, as they might want to filter.
              cat.any && setTimeout.each(Object.keys(cat.any), function(any){ (any = cat.any[any]) && any(msg) },0,99); // 1st API job is to call all chain listeners. // TODO: .keys( is slow // BUG: Some re-in logic may depend on this being sync.
              cat.echo && setTimeout.each(Object.keys(cat.echo), function(lat){ (lat = cat.echo[lat]) && lat.on('in', msg) },0,99); // & linked at chains // TODO: .keys( is slow // BUG: Some re-in logic may depend on this being sync.
  
              if(((msg.$$||'')._||at).soul){ // comments are linear, but this line of code is non-linear, so if I were to comment what it does, you'd have to read 42 other comments first... but you can't read any of those comments until you first read this comment. What!? // shouldn't this match link's check?
                  // is there cases where it is a $$ that we do NOT want to do the following? 
                  if((sat = cat.next) && (sat = sat[key])){ // TODO: possible trick? Maybe have `ionmap` code set a sat? // TODO: Maybe we should do `cat.ask` instead? I guess does not matter.
                      tmp = {}; Object.keys(msg).forEach(function(k){ tmp[k] = msg[k] });
                      tmp.$ = (msg.$$||msg.$).get(tmp.get = key); delete tmp.$$; delete tmp.$$$;
                      sat.on('in', tmp);
                  }
              }
  
              link(msg, cat);
          }; Gun.on.in = input;
  
          function link(msg, cat){ cat = cat || this.as || msg.$._;
              if(msg.$$ && this !== Gun.on){ return } // $$ means we came from a link, so we are at the wrong level, thus ignore it unless overruled manually by being called directly.
              if(!msg.put || cat.soul){ return } // But you cannot overrule being linked to nothing, or trying to link a soul chain - that must never happen.
              var put = msg.put||'', link = put['=']||put[':'], tmp;
              var root = cat.root, tat = root.$.get(put['#']).get(put['.'])._;
              if('string' != typeof (link = valid(link))){
                  if(this === Gun.on){ (tat.echo || (tat.echo = {}))[cat.id] = cat } // allow some chain to explicitly force linking to simple data.
                  return; // by default do not link to data that is not a link.
              }
              if((tat.echo || (tat.echo = {}))[cat.id] // we've already linked ourselves so we do not need to do it again. Except... (annoying implementation details)
                  && !(root.pass||'')[cat.id]){ return } // if a new event listener was added, we need to make a pass through for it. The pass will be on the chain, not always the chain passed down. 
              if(tmp = root.pass){ if(tmp[link+cat.id]){ return } tmp[link+cat.id] = 1 } // But the above edge case may "pass through" on a circular graph causing infinite passes, so we hackily add a temporary check for that.
  
              (tat.echo||(tat.echo={}))[cat.id] = cat; // set ourself up for the echo! // TODO: BUG? Echo to self no longer causes problems? Confirm.
  
              if(cat.has){ cat.link = link }
              var sat = root.$.get(tat.link = link)._; // grab what we're linking to.
              (sat.echo || (sat.echo = {}))[tat.id] = tat; // link it.
              var tmp = cat.ask||''; // ask the chain for what needs to be loaded next!
              if(tmp[''] || cat.lex){ // we might need to load the whole thing // TODO: cat.lex probably has edge case bugs to it, need more test coverage.
                  sat.on('out', {get: {'#': link}});
              }
              setTimeout.each(Object.keys(tmp), function(get, sat){ // if sub chains are asking for data. // TODO: .keys( is slow // BUG? ?Some re-in logic may depend on this being sync?
                  if(!get || !(sat = tmp[get])){ return }
                  sat.on('out', {get: {'#': link, '.': get}}); // go get it.
              },0,99);
          }; Gun.on.link = link;
  
          function unlink(msg, cat){ // ugh, so much code for seemingly edge case behavior.
              var put = msg.put||'', change = (u !== put['='])? put['='] : put[':'], root = cat.root, link, tmp;
              if(u === change){ // 1st edge case: If we have a brand new database, no data will be found.
                  // TODO: BUG! because emptying cache could be async from below, make sure we are not emptying a newer cache. So maybe pass an Async ID to check against?
                  // TODO: BUG! What if this is a map? // Warning! Clearing things out needs to be robust against sync/async ops, or else you'll see `map val get put` test catastrophically fail because map attempts to link when parent graph is streamed before child value gets set. Need to differentiate between lack acks and force clearing.
                  if(cat.soul && u !== cat.put){ return } // data may not be found on a soul, but if a soul already has data, then nothing can clear the soul as a whole.
                  //if(!cat.has){ return }
                  tmp = (msg.$$||msg.$||'')._||'';
                  if(msg['@'] && (u !== tmp.put || u !== cat.put)){ return } // a "not found" from other peers should not clear out data if we have already found it.
                  //if(cat.has && u === cat.put && !(root.pass||'')[cat.id]){ return } // if we are already unlinked, do not call again, unless edge case. // TODO: BUG! This line should be deleted for "unlink deeply nested".
                  if(link = cat.link || msg.linked){
                      delete (root.$.get(link)._.echo||'')[cat.id];
                  }
                  if(cat.has){ // TODO: Empty out links, maps, echos, acks/asks, etc.?
                      cat.link = null;
                  }
                  cat.put = u; // empty out the cache if, for example, alice's car's color no longer exists (relative to alice) if alice no longer has a car.
                  // TODO: BUG! For maps, proxy this so the individual sub is triggered, not all subs.
                  setTimeout.each(Object.keys(cat.next||''), function(get, sat){ // empty out all sub chains. // TODO: .keys( is slow // BUG? ?Some re-in logic may depend on this being sync? // TODO: BUG? This will trigger deeper put first, does put logic depend on nested order? // TODO: BUG! For map, this needs to be the isolated child, not all of them.
                      if(!(sat = cat.next[get])){ return }
                      //if(cat.has && u === sat.put && !(root.pass||'')[sat.id]){ return } // if we are already unlinked, do not call again, unless edge case. // TODO: BUG! This line should be deleted for "unlink deeply nested".
                      if(link){ delete (root.$.get(link).get(get)._.echo||'')[sat.id] }
                      sat.on('in', {get: get, put: u, $: sat.$}); // TODO: BUG? Add recursive seen check?
                  },0,99);
                  return;
              }
              if(cat.soul){ return } // a soul cannot unlink itself.
              if(msg.$$){ return } // a linked chain does not do the unlinking, the sub chain does. // TODO: BUG? Will this cancel maps?
              link = valid(change); // need to unlink anytime we are not the same link, though only do this once per unlink (and not on init).
              tmp = msg.$._||'';
              if(link === tmp.link || (cat.has && !tmp.link)){
                  if((root.pass||'')[cat.id] && 'string' !== typeof link){
  
                  } else {
                      return;
                  }
              }
              delete (tmp.echo||'')[cat.id];
              unlink({get: cat.get, put: u, $: msg.$, linked: msg.linked = msg.linked || tmp.link}, cat); // unlink our sub chains.
          }; Gun.on.unlink = unlink;
  
          function ack(msg, ev){
              if((this||'').off){ this.off() } // do NOT memory leak, turn off listeners!
              // manhattan:
              var as = this.as, at = as.$._, root = at.root, get = as.get||'', tmp = (msg.put||'')[get['#']]||'';
              if(!msg.put || ('string' == typeof get['.'] && u === tmp[get['.']])){
                  if(u !== at.put){ return }
                  if(!at.soul && !at.has){ return } // TODO: BUG? For now, only core-chains will handle not-founds, because bugs creep in if non-core chains are used as $ but we can revisit this later for more powerful extensions.
                  at.ack = (at.ack || 0) + 1;
                  at.on('in', {
                      get: at.get,
                      put: at.put = u,
                      $: at.$,
                      '@': msg['@']
                  });
                  /*(tmp = at.Q) && setTimeout.each(Object.keys(tmp), function(id){ // TODO: Temporary testing, not integrated or being used, probably delete.
                      Object.keys(msg).forEach(function(k){ tmp[k] = msg[k] }, tmp = {}); tmp['@'] = id; // copy message
                      root.on('in', tmp);
                  }); delete at.Q;*/
                  return;
              }
              (msg._||{}).miss = 1;
              Gun.on.put(msg);
              return; // eom
          }
  
          var empty = {}, u, text_rand = String.random, valid = Gun.valid, obj_has = function(o, k){ return o && Object.prototype.hasOwnProperty.call(o, k) }, state = Gun.state, state_is = state.is, state_ify = state.ify;
      })(USE, './chain');
  
      ;USE(function(module){
          var Gun = USE('./root');
          Gun.chain.get = function(key, cb, as){
              var gun, tmp;
              if(typeof key === 'string'){
                  var back = this, cat = back._;
                  var next = cat.next || empty;
                  if(!(gun = next[key])){
                      gun = cache(key, back);
                  }
                  gun = gun.$;
              } else
              if('function' == typeof key){
                  if(true === cb){ return soul(this, key, cb, as), this }
  
                  var gun = this, cat = gun._, opt = cb || {}, root = cat.root, id;
                  opt.at = cat;
                  opt.ok = key;
                  var wait = {}; // can we assign this to the at instead, like in once?
                  function any(msg, eve, f){
                      if(any.stun){ return }
                      var at = msg.$._, data = at.put, aid, tmp;
                      if((tmp = root.pass) && !tmp[id]){ return }
                      if(!at.has && !at.soul){ data = (u !== (msg.put||'')['='])? msg.put['='] : msg.put } // handles non-core messages.
                      if('string' == typeof (tmp = Gun.valid(data))){ data = root.$.get(tmp)._.put } // TODO: Can we delete this line of code, because the line below (which was inspired by @rogowski) handles it anyways?
                      if(u === data && msg.$$){ data = msg.$$._.put }
                      if(u !== opt.not && u === data){ return }
                      if(u === opt.stun){
                          //if(tmp = root.stun){ tmp = tmp[at.id] || at.$.back(function(back){ return tmp[back.id] || u }); if(tmp && !tmp.end && any.id > (tmp._||'').id){ // this is more thorough, but below seems to work too?
                          //if((tmp = root.stun) && (tmp = tmp[at.id] || tmp[at.back.id]) && !tmp.end && any.id > (tmp._||'').id){ // if we are in the middle of a write, don't read until it is done, unless our callback was earlier than the write.
                          if((tmp = root.stun) && (tmp = tmp[aid = cat.id] || tmp[aid = at.id] || (msg.$$ && tmp[aid = msg.$$._.id]) /*|| tmp[aid = at.back.id]*/) && any.id > tmp.run){
                              if(tmp.stun && !tmp.stun.end){
                                  tmp.stun[id] = function(){any(msg,eve,1)}; // add ourself to the stun callback list that is called at end of the write.
                                  return;
                              }
                              root.stun[aid] = tmp.next;
                              any(msg,eve,f);
                              return;
                          }
                          if((tmp = root.hatch) && !tmp.end && u === opt.hatch && !f){ // quick hack! // What's going on here? Because data is streamed, we get things one by one, but a lot of developers would rather get a callback after each batch instead, so this does that by creating a wait list per chain id that is then called at the end of the batch by the hatch code in the root put listener.
                              if(wait[at.$._.id]){ return } wait[at.$._.id] = 1;
                              tmp.push(function(){any(msg,eve,1)});
                              return;
                          }; wait = {}; // end quick hack.
                      }
                      //tmp = any.wait || (any.wait = {}); console.log(tmp[at.id] === ''); if(tmp[at.id] !== ''){ tmp[at.id] = tmp[at.id] || setTimeout(function(){tmp[at.id]='';any(msg,eve)},1); return } delete tmp[at.id];
                      // call:
                      if(opt.on){ opt.ok.call(at.$, data, at.get, msg, eve || any); return } // TODO: Also consider breaking `this` since a lot of people do `=>` these days and `.call(` has slower performance.
                      if(opt.v2020){ opt.ok(msg, eve || any); return }
                      Object.keys(msg).forEach(function(k){ tmp[k] = msg[k] }, tmp = {}); msg = tmp; msg.put = data; // 2019 COMPATIBILITY! TODO: GET RID OF THIS!
                      opt.ok.call(opt.as, msg, eve || any); // is this the right
                  };
                  any.at = cat;
                  //(cat.any||(cat.any=function(msg){ setTimeout.each(Object.keys(cat.any||''), function(act){ (act = cat.any[act]) && act(msg) },0,99) }))[id = String.random(7)] = any; // maybe switch to this in future?
                  (cat.any||(cat.any={}))[id = String.random(7)] = any;
                  any.off = function(){ any.stun = 1; if(!cat.any){ return } delete cat.any[id] }
                  any.rid = rid; // logic from old version, can we clean it up now?
                  any.id = opt.run || ++root.once; // used in callback to check if we are earlier than a write. // will this ever cause an integer overflow?
                  tmp = root.pass; (root.pass = {})[id] = 1; // Explanation: test trade-offs want to prevent recursion so we add/remove pass flag as it gets fulfilled to not repeat, however map map needs many pass flags - how do we reconcile?
                  cat.on('out', {get: {}});
                  root.pass = tmp;
                  return gun;
  
              } else
              if('number' == typeof key){
                  return this.get(''+key, cb, as);
              } else
              if('string' == typeof (tmp = valid(key))){
                  return this.get(tmp, cb, as);
              } else
              if(Object.plain(key)){
                  gun = this;
                  if(tmp = ((tmp = key['#'])||'')['='] || tmp){ return gun.get(tmp) }
                  (tmp = gun.chain()._).lex = key; // LEX: // TODO! Consider making this only a `.map(` thing?
                  gun.on('in', function(eve){ this.to.next(eve); tmp.on('in', eve) }); // should filter here but ^
                  return tmp.$;
              } else {
                  (as = this.chain())._.err = {err: Gun.log('Invalid get request!', key)}; // CLEAN UP
                  if(cb){ cb.call(as, as._.err) }
                  return as;
              }
              if(tmp = this._.stun){ // TODO: Refactor?
                  gun._.stun = gun._.stun || tmp;
              }
              if(cb && 'function' == typeof cb){
                  gun.get(cb, as);
              }
              return gun;
          }
          function cache(key, back){
              var cat = back._, next = cat.next, gun = back.chain(), at = gun._;
              if(!next){ next = cat.next = {} }
              next[at.get = key] = at;
              if(back === cat.root.$){
                  at.soul = key;
              } else
              if(cat.soul || cat.has){
                  at.has = key;
                  //if(obj_has(cat.put, key)){
                      //at.put = cat.put[key];
                  //}
              }
              return at;
          }
          function soul(gun, cb, opt, as){
              var cat = gun._, acks = 0, tmp;
              if(tmp = cat.soul || cat.link){ return cb(tmp, as, cat) }
              if(cat.jam){ return cat.jam.push([cb, as]) }
              cat.jam = [[cb,as]];
              gun.get(function go(msg, eve){
                  if(u === msg.put && !cat.root.opt.super && (tmp = Object.keys(cat.root.opt.peers).length) && ++acks <= tmp){ // TODO: super should not be in core code, bring AXE up into core instead to fix? // TODO: .keys( is slow
                      return;
                  }
                  eve.rid(msg);
                  var at = ((at = msg.$) && at._) || {}, i = 0, as;
                  tmp = cat.jam; delete cat.jam; // tmp = cat.jam.splice(0, 100);
                  //if(tmp.length){ process.nextTick(function(){ go(msg, eve) }) }
                  while(as = tmp[i++]){ //Gun.obj.map(tmp, function(as, cb){
                      var cb = as[0], id; as = as[1];
                      cb && cb(id = at.link || at.soul || Gun.valid(msg.put) || ((msg.put||{})._||{})['#'], as, msg, eve);
                  } //);
              }, {out: {get: {'.':true}}});
              return gun;
          }
          function rid(at){
              var cat = this.at || this.on;
              if(!at || cat.soul || cat.has){ return this.off() }
              if(!(at = (at = (at = at.$ || at)._ || at).id)){ return }
              var map = cat.map, tmp, seen;
              //if(!map || !(tmp = map[at]) || !(tmp = tmp.at)){ return }
              if(tmp = (seen = this.seen || (this.seen = {}))[at]){ return true }
              seen[at] = true;
              return;
              //tmp.echo[cat.id] = {}; // TODO: Warning: This unsubscribes ALL of this chain's listeners from this link, not just the one callback event.
              //obj.del(map, at); // TODO: Warning: This unsubscribes ALL of this chain's listeners from this link, not just the one callback event.
              return;
          }
          var empty = {}, valid = Gun.valid, u;
      })(USE, './get');
  
      ;USE(function(module){
          var Gun = USE('./root');
          Gun.chain.put = function(data, cb, as){ // I rewrote it :)
              var gun = this, at = gun._, root = at.root;
              as = as || {};
              as.root = at.root;
              as.run || (as.run = root.once);
              (as.stun || (as.stun = function(){ return as.run })).back = (root.stun || (root.stun = {}))._; (as.ta = root.stun)._ = as.stun;
              stun(as, at.id); // set a flag for reads to check if this chain is writing.
              as.ack = as.ack || cb;
              as.via = as.via || gun;
              as.data = as.data || data;
              as.soul || (as.soul = at.soul || ('string' == typeof cb && cb));
              var s = as.state = as.state || Gun.state();
              if('function' == typeof data){ data(function(d){ as.data = d; gun.put(u,u,as) }); return gun }
              if(!as.soul){ return get(as), gun }
              as.$ = root.$.get(as.soul); // TODO: This may not allow user chaining and similar?
              as.todo = [{it: as.data, ref: as.$}];
              as.turn = as.turn || turn;
              as.ran = as.ran || ran;
              // TODO: Perf! We only need to stun chains that are being modified, not necessarily written to.
              (function walk(){
                  var to = as.todo, at = to.pop(), d = at.it, cid = at.ref && at.ref._.id, v, k, cat, tmp, g;
                  stun(as, at.ref);
                  if(tmp = at.todo){
                      k = tmp.pop(); d = d[k];
                      if(tmp.length){ to.push(at) }
                  }
                  if(!(v = valid(d)) && !(g = Gun.is(d))){
                      if(!Object.plain(d)){ (as.ack||noop).call(as, as.out = {err: as.err = Gun.log("Invalid data, " + typeof d + " at " + (as.path||[]).join('.'))}); as.ran(as); return }
                      var seen = as.seen || (as.seen = []), i = seen.length;
                      while(i--){ if(d === (tmp = seen[i]).it){ v = d = tmp.link; break } }
                  }
                  if(k && v){ at.node = state_ify(at.node, k, s, d) } // handle soul later.
                  else {
                      as.seen.push(cat = {it: d, link: {}, todo: g? [] : Object.keys(d).sort().reverse()}); // Any perf reasons to CPU schedule this .keys( ?
                      at.node = state_ify(at.node, k, s, cat.link);
                      !g && cat.todo.length && to.push(cat);
                      // ---------------
                      var id = as.seen.length;
                      (as.wait || (as.wait = {}))[id] = '';
                      tmp = (cat.ref = (g? d : k? at.ref.get(k) : at.ref))._;
                      (tmp = (d && (d._||'')['#']) || tmp.soul || tmp.link)? resolve({soul: tmp}) : cat.ref.get(resolve, {run: as.run, /*hatch: 0,*/ v2020:1}); // TODO: BUG! This should be resolve ONLY soul to prevent full data from being loaded.
                      function resolve(msg, eve){
                          if(eve){ eve.off(); eve.rid(msg) } // TODO: Too early! Check all peers ack not found.
                          // TODO: BUG maybe? Make sure this does not pick up a link change wipe, that it uses the changign link instead.
                          var soul = msg.soul || (tmp = (msg.$$||msg.$)._||'').soul || tmp.link || ((tmp = tmp.put||'')._||'')['#'] || tmp['#'] || (((tmp = msg.put||'') && msg.$$)? tmp['#'] : (tmp['=']||tmp[':']||'')['#']);
                          stun(as, msg.$);
                          if(!soul){
                              soul = [];
                              msg.$.back(function(at){
                                  if(tmp = at.soul || at.link){ return soul.push(tmp) }
                                  soul.push(at.get);
                              });
                              soul = soul.reverse().join('/');
                          }
                          cat.link['#'] = soul;
                          !g && (((as.graph || (as.graph = {}))[soul] = (cat.node || (cat.node = {_:{}})))._['#'] = soul);
                          delete as.wait[id];
                          as.ran(as);
                      };
                      // ---------------
                  }
                  if(!to.length){ return as.ran(as) }
                  as.turn(walk);
              }());
              return gun;
          }
  
          function stun(as, id){
              if(!id){ return } id = (id._||'').id||id;
              tmp = as.root.stun || (as.root.stun = as.ta);
              var it = {run: as.run, stun: as.stun};
              (tmp[id]? (tmp[id].last.next = it) : (tmp[id] = it)).last = it;
          }
  
          function ran(as){
              if(as.err){ console.log("GUN in a buggy state, restart & report please."); return } // move log handle here. // TODO: BUG! Clear out stun!
              if(as.todo.length || as.end || !Object.empty(as.wait)){ return } as.end = 1;
              var cat = (as.$.back(-1)._), root = cat.root, ask = cat.ask(function(ack){
                  root.on('ack', ack);
                  if(ack.err){ Gun.log(ack) }
                  if(++acks > (as.acks || 0)){ this.off() } // Adjustable ACKs! Only 1 by default.
                  if(!as.ack){ return }
                  as.ack(ack, this);
              }, as.opt), acks = 0, stun = as.stun, tmp;
              (tmp = function(){ // this is not official yet, but quick solution to hack in for now.
                  if(!stun){ return } stun.end = noop; // like with the earlier id, cheaper to make this flag a function so below callbacks do not have to do an extra type check.
                  if(root.stun){ delete root.stun['s'+as.run] }
                  if((tmp = root.stun) && stun === tmp._){
                      if(!(tmp = stun.back) || tmp.end){
                          delete root.stun; // ABC, ACB, BAC, BCA, CBA, CAB;
                      }
                      (root.stun||{})._ = tmp;
                  }
                  setTimeout.each(Object.keys(stun), function(cb){ if(cb = stun[cb]){cb()} }); // resume the stunned reads // Any perf reasons to CPU schedule this .keys( ?
              }).hatch = tmp; // this is not official yet ^
              //console.log(1, "PUT", as.run, as.graph);
              (as.via._).on('out', {put: as.out = as.graph, opt: as.opt, '#': ask, _: tmp});
          }
  
          function get(as){
              var at = as.via._, tmp;
              as.via = as.via.back(function(at){
                  if(at.soul || !at.get){ return at.$ }
                  tmp = as.data; (as.data = {})[at.get] = tmp;
              });
              if(!as.via || !as.via._.soul){
                  as.via = at.root.$.get(((as.data||'')._||'')['#'] || at.$.back('opt.uuid')())
              }
              as.via.put(as.data, as.ack, as);
              
  
              return;
              if(at.get && at.back.soul){
                  tmp = as.data;
                  as.via = at.back.$;
                  (as.data = {})[at.get] = tmp; 
                  as.via.put(as.data, as.ack, as);
                  return;
              }
          }
  
          var u, empty = {}, noop = function(){}, turn = setTimeout.turn, valid = Gun.valid, state_ify = Gun.state.ify;
          var iife = function(fn,as){fn.call(as||empty)}
      })(USE, './put');
  
      ;USE(function(module){
          var Gun = USE('./root');
          USE('./chain');
          USE('./back');
          USE('./put');
          USE('./get');
          module.exports = Gun;
      })(USE, './index');
  
      ;USE(function(module){
          var Gun = USE('./index');
          Gun.chain.on = function(tag, arg, eas, as){ // don't rewrite!
              var gun = this, cat = gun._, root = cat.root, act, off, id, tmp;
              if(typeof tag === 'string'){
                  if(!arg){ return cat.on(tag) }
                  act = cat.on(tag, arg, eas || cat, as);
                  if(eas && eas.$){
                      (eas.subs || (eas.subs = [])).push(act);
                  }
                  return gun;
              }
              var opt = arg;
              (opt = (true === opt)? {change: true} : opt || {}).not = 1; opt.on = 1;
              //opt.at = cat;
              //opt.ok = tag;
              //opt.last = {};
              var wait = {}; // can we assign this to the at instead, like in once?
              gun.get(tag, opt);
              /*gun.get(function on(data,key,msg,eve){ var $ = this;
                  if(tmp = root.hatch){ // quick hack!
                      if(wait[$._.id]){ return } wait[$._.id] = 1;
                      tmp.push(function(){on.call($, data,key,msg,eve)});
                      return;
                  }; wait = {}; // end quick hack.
                  tag.call($, data,key,msg,eve);
              }, opt); // TODO: PERF! Event listener leak!!!?*/
              /*
              function one(msg, eve){
                  if(one.stun){ return }
                  var at = msg.$._, data = at.put, tmp;
                  if(tmp = at.link){ data = root.$.get(tmp)._.put }
                  if(opt.not===u && u === data){ return }
                  if(opt.stun===u && (tmp = root.stun) && (tmp = tmp[at.id] || tmp[at.back.id]) && !tmp.end){ // Remember! If you port this into `.get(cb` make sure you allow stun:0 skip option for `.put(`.
                      tmp[id] = function(){one(msg,eve)};
                      return;
                  }
                  //tmp = one.wait || (one.wait = {}); console.log(tmp[at.id] === ''); if(tmp[at.id] !== ''){ tmp[at.id] = tmp[at.id] || setTimeout(function(){tmp[at.id]='';one(msg,eve)},1); return } delete tmp[at.id];
                  // call:
                  if(opt.as){
                      opt.ok.call(opt.as, msg, eve || one);
                  } else {
                      opt.ok.call(at.$, data, msg.get || at.get, msg, eve || one);
                  }
              };
              one.at = cat;
              (cat.act||(cat.act={}))[id = String.random(7)] = one;
              one.off = function(){ one.stun = 1; if(!cat.act){ return } delete cat.act[id] }
              cat.on('out', {get: {}});*/
              return gun;
          }
          // Rules:
          // 1. If cached, should be fast, but not read while write.
          // 2. Should not retrigger other listeners, should get triggered even if nothing found.
          // 3. If the same callback passed to many different once chains, each should resolve - an unsubscribe from the same callback should not effect the state of the other resolving chains, if you do want to cancel them all early you should mutate the callback itself with a flag & check for it at top of callback
          Gun.chain.once = function(cb, opt){ opt = opt || {}; // avoid rewriting
              if(!cb){ return none(this,opt) }
              var gun = this, cat = gun._, root = cat.root, data = cat.put, id = String.random(7), one, tmp;
              gun.get(function(data,key,msg,eve){
                  var $ = this, at = $._, one = (at.one||(at.one={}));
                  if(eve.stun){ return } if('' === one[id]){ return }
                  if(true === (tmp = Gun.valid(data))){ once(); return }
                  if('string' == typeof tmp){ return } // TODO: BUG? Will this always load?
                  clearTimeout(one[id]); one[id] = setTimeout(once, opt.wait||99); // TODO: Bug? This doesn't handle plural chains.
                  function once(){
                      if(!at.has && !at.soul){ at = {put: data, get: key} } // handles non-core messages.
                      if(u === (tmp = at.put)){ tmp = ((msg.$$||'')._||'').put }
                      if('string' == typeof Gun.valid(tmp)){ tmp = root.$.get(tmp)._.put; if(tmp === u){return} }
                      if(eve.stun){ return } if('' === one[id]){ return } one[id] = '';
                      if(cat.soul || cat.has){ eve.off() } // TODO: Plural chains? // else { ?.off() } // better than one check?
                      cb.call($, tmp, at.get);
                  };
              }, {on: 1});
              return gun;
          }
          function none(gun,opt,chain){
              Gun.log.once("valonce", "Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
              (chain = gun.chain())._.nix = gun.once(function(data, key){ chain._.on('in', this._) });
              chain._.lex = gun._.lex; // TODO: Better approach in future? This is quick for now.
              return chain;
          }
  
          Gun.chain.off = function(){
              // make off more aggressive. Warning, it might backfire!
              var gun = this, at = gun._, tmp;
              var cat = at.back;
              if(!cat){ return }
              at.ack = 0; // so can resubscribe.
              if(tmp = cat.next){
                  if(tmp[at.get]){
                      delete tmp[at.get];
                  } else {
  
                  }
              }
              // TODO: delete cat.one[map.id]?
              if(tmp = cat.ask){
                  delete tmp[at.get];
              }
              if(tmp = cat.put){
                  delete tmp[at.get];
              }
              if(tmp = at.soul){
                  delete cat.root.graph[tmp];
              }
              if(tmp = at.map){
                  Object.keys(tmp).forEach(function(i,at){ at = tmp[i]; //obj_map(tmp, function(at){
                      if(at.link){
                          cat.root.$.get(at.link).off();
                      }
                  });
              }
              if(tmp = at.next){
                  Object.keys(tmp).forEach(function(i,neat){ neat = tmp[i]; //obj_map(tmp, function(neat){
                      neat.$.off();
                  });
              }
              at.on('off', {});
              return gun;
          }
          var empty = {}, noop = function(){}, u;
      })(USE, './on');
  
      ;USE(function(module){
          var Gun = USE('./index');
          Gun.chain.map = function(cb, opt, t){
              var gun = this, cat = gun._, lex, chain;
              if(Object.plain(cb)){ lex = cb['.']? cb : {'.': cb}; cb = u }
              if(!cb){
                  if(chain = cat.each){ return chain }
                  (cat.each = chain = gun.chain())._.lex = lex || chain._.lex || cat.lex;
                  chain._.nix = gun.back('nix');
                  gun.on('in', map, chain._);
                  return chain;
              }
              Gun.log.once("mapfn", "Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
              chain = gun.chain();
              gun.map().on(function(data, key, msg, eve){
                  var next = (cb||noop).call(this, data, key, msg, eve);
                  if(u === next){ return }
                  if(data === next){ return chain._.on('in', msg) }
                  if(Gun.is(next)){ return chain._.on('in', next._) }
                  var tmp = {}; Object.keys(msg.put).forEach(function(k){ tmp[k] = msg.put[k] }, tmp); tmp['='] = next; 
                  chain._.on('in', {get: key, put: tmp});
              });
              return chain;
          }
          function map(msg){ this.to.next(msg);
              var cat = this.as, gun = msg.$, at = gun._, put = msg.put, tmp;
              if(!at.soul && !msg.$$){ return } // this line took hundreds of tries to figure out. It only works if core checks to filter out above chains during link tho. This says "only bother to map on a node" for this layer of the chain. If something is not a node, map should not work.
              if((tmp = cat.lex) && !String.match(msg.get|| (put||'')['.'], tmp['.'] || tmp['#'] || tmp)){ return }
              Gun.on.link(msg, cat);
          }
          var noop = function(){}, event = {stun: noop, off: noop}, u;
      })(USE, './map');
  
      ;USE(function(module){
          var Gun = USE('./index');
          Gun.chain.set = function(item, cb, opt){
              var gun = this, root = gun.back(-1), soul, tmp;
              cb = cb || function(){};
              opt = opt || {}; opt.item = opt.item || item;
              if(soul = ((item||'')._||'')['#']){ (item = {})['#'] = soul } // check if node, make link.
              if('string' == typeof (tmp = Gun.valid(item))){ return gun.get(soul = tmp).put(item, cb, opt) } // check if link
              if(!Gun.is(item)){
                  if(Object.plain(item)){
                      item = root.get(soul = gun.back('opt.uuid')()).put(item);
                  }
                  return gun.get(soul || root.back('opt.uuid')(7)).put(item, cb, opt);
              }
              gun.put(function(go){
                  item.get(function(soul, o, msg){ // TODO: BUG! We no longer have this option? & go error not handled?
                      if(!soul){ return cb.call(gun, {err: Gun.log('Only a node can be linked! Not "' + msg.put + '"!')}) }
                      (tmp = {})[soul] = {'#': soul}; go(tmp);
                  },true);
              })
              return item;
          }
      })(USE, './set');
  
      ;USE(function(module){
          USE('./shim');
  
          function Mesh(root){
              var mesh = function(){};
              var opt = root.opt || {};
              opt.log = opt.log || console.log;
              opt.gap = opt.gap || opt.wait || 0;
              opt.pack = opt.pack || (opt.memory? (opt.memory * 999 * 999) : 300000000) * 0.3;
              opt.puff = opt.puff || 9; // IDEA: do a start/end benchmark, divide ops/result.
              var puff = setTimeout.turn || setTimeout;
              var parse = JSON.parseAsync || function(t,cb,r){ var u; try{ cb(u, JSON.parse(t,r)) }catch(e){ cb(e) } }
              var json = JSON.stringifyAsync || function(v,cb,r,s){ var u; try{ cb(u, JSON.stringify(v,r,s)) }catch(e){ cb(e) } }
  
              var dup = root.dup, dup_check = dup.check, dup_track = dup.track;
  
              var ST = +new Date, LT = ST;
  
              var hear = mesh.hear = function(raw, peer){
                  if(!raw){ return }
                  if(opt.pack <= raw.length){ return mesh.say({dam: '!', err: "Message too big!"}, peer) }
                  if(mesh === this){
                      /*if('string' == typeof raw){ try{
                          var stat = console.STAT || {};
                          //console.log('HEAR:', peer.id, (raw||'').slice(0,250), ((raw||'').length / 1024 / 1024).toFixed(4));
                          
                          //console.log(setTimeout.turn.s.length, 'stacks', parseFloat((-(LT - (LT = +new Date))/1000).toFixed(3)), 'sec', parseFloat(((LT-ST)/1000 / 60).toFixed(1)), 'up', stat.peers||0, 'peers', stat.has||0, 'has', stat.memhused||0, stat.memused||0, stat.memax||0, 'heap mem max');
                      }catch(e){ console.log('DBG err', e) }}*/
  
                      hear.d += raw.length||0 ; ++hear.c } // STATS!
                  var S = peer.SH = +new Date;
                  var tmp = raw[0], msg;
                  if('[' === tmp){
                      parse(raw, function(err, msg){
                          if(err || !msg){ return mesh.say({dam: '!', err: "DAM JSON parse error."}, peer) }
                          console.STAT && console.STAT(+new Date, msg.length, '# on hear batch');
                          var P = opt.puff;
                          (function go(){
                              var S = +new Date;
                              var i = 0, m; while(i < P && (m = msg[i++])){ hear(m, peer) }
                              msg = msg.slice(i); // slicing after is faster than shifting during.
                              console.STAT && console.STAT(S, +new Date - S, 'hear loop');
                              flush(peer); // force send all synchronously batched acks.
                              if(!msg.length){ return }
                              puff(go, 0);
                          }());
                      });
                      raw = ''; // 
                      return;
                  }
                  if('{' === tmp || ((raw['#'] || Object.plain(raw)) && (msg = raw))){
                      if(msg){ return hear.one(msg, peer, S) }
                      parse(raw, function(err, msg){
                          if(err || !msg){ return mesh.say({dam: '!', err: "DAM JSON parse error."}, peer) }
                          hear.one(msg, peer, S);
                      });
                      return;
                  }
              }
              hear.one = function(msg, peer, S){ // S here is temporary! Undo.
                  var id, hash, tmp, ash, DBG;
                  if(msg.DBG){ msg.DBG = DBG = {DBG: msg.DBG} }
                  DBG && (DBG.h = S);
                  DBG && (DBG.hp = +new Date);
                  if(!(id = msg['#'])){ id = msg['#'] = String.random(9) }
                  if(tmp = dup_check(id)){ return }
                  // DAM logic:
                  if(!(hash = msg['##']) && false && u !== msg.put){ /*hash = msg['##'] = Type.obj.hash(msg.put)*/ } // disable hashing for now // TODO: impose warning/penalty instead (?)
                  if(hash && (tmp = msg['@'] || (msg.get && id)) && dup.check(ash = tmp+hash)){ return } // Imagine A <-> B <=> (C & D), C & D reply with same ACK but have different IDs, B can use hash to dedup. Or if a GET has a hash already, we shouldn't ACK if same.
                  (msg._ = function(){}).via = mesh.leap = peer;
                  if((tmp = msg['><']) && 'string' == typeof tmp){ tmp.slice(0,99).split(',').forEach(function(k){ this[k] = 1 }, (msg._).yo = {}) } // Peers already sent to, do not resend.
                  // DAM ^
                  if(tmp = msg.dam){
                      if(tmp = mesh.hear[tmp]){
                          tmp(msg, peer, root);
                      }
                      dup_track(id);
                      return;
                  }
                  var S = +new Date;
                  DBG && (DBG.is = S); peer.SI = id;
                  root.on('in', mesh.last = msg);
                  //ECHO = msg.put || ECHO; !(msg.ok !== -3740) && mesh.say({ok: -3740, put: ECHO, '@': msg['#']}, peer);
                  DBG && (DBG.hd = +new Date);
                  console.STAT && console.STAT(S, +new Date - S, msg.get? 'msg get' : msg.put? 'msg put' : 'msg');
                  (tmp = dup_track(id)).via = peer; // don't dedup message ID till after, cause GUN has internal dedup check.
                  if(msg.get){ tmp.it = msg }
                  if(ash){ dup_track(ash) } //dup.track(tmp+hash, true).it = it(msg);
                  mesh.leap = mesh.last = null; // warning! mesh.leap could be buggy.
              }
              var tomap = function(k,i,m){m(k,true)};
              var noop = function(){};
              hear.c = hear.d = 0;
  
              ;(function(){
                  var SMIA = 0;
                  var loop;
                  mesh.hash = function(msg, peer){ var h, s, t;
                      var S = +new Date;
                      json(msg.put, function hash(err, text){
                          var ss = (s || (s = t = text||'')).slice(0, 32768); // 1024 * 32
                        h = String.hash(ss, h); s = s.slice(32768);
                        if(s){ puff(hash, 0); return }
                          console.STAT && console.STAT(S, +new Date - S, 'say json+hash');
                        msg._.$put = t;
                        msg['##'] = h;
                        say(msg, peer);
                        delete msg._.$put;
                      }, sort);
                  }
                  function sort(k, v){ var tmp;
                      if(!(v instanceof Object)){ return v }
                      Object.keys(v).sort().forEach(sorta, {to: tmp = {}, on: v});
                      return tmp;
                  } function sorta(k){ this.to[k] = this.on[k] }
  
                  var say = mesh.say = function(msg, peer){ var tmp;
                      if((tmp = this) && (tmp = tmp.to) && tmp.next){ tmp.next(msg) } // compatible with middleware adapters.
                      if(!msg){ return false }
                      var id, hash, raw, ack = msg['@'];
  //if(opt.super && (!ack || !msg.put)){ return } // TODO: MANHATTAN STUB //OBVIOUSLY BUG! But squelch relay. // :( get only is 100%+ CPU usage :(
                      var meta = msg._||(msg._=function(){});
                      var DBG = msg.DBG, S = +new Date; meta.y = meta.y || S; if(!peer){ DBG && (DBG.y = S) }
                      if(!(id = msg['#'])){ id = msg['#'] = String.random(9) }
                      !loop && dup_track(id);//.it = it(msg); // track for 9 seconds, default. Earth<->Mars would need more! // always track, maybe move this to the 'after' logic if we split function.
                      if(msg.put && (msg.err || (dup.s[id]||'').err)){ return false } // TODO: in theory we should not be able to stun a message, but for now going to check if it can help network performance preventing invalid data to relay.
                      if(!(hash = msg['##']) && u !== msg.put && !meta.via && ack){ mesh.hash(msg, peer); return } // TODO: Should broadcasts be hashed?
                      DBG && (DBG.yh = +new Date);
                      if(!(raw = meta.raw)){ mesh.raw(msg, peer); return }
                      DBG && (DBG.yr = +new Date);
                      if(!peer && ack){ peer = ((tmp = dup.s[ack]) && (tmp.via || ((tmp = tmp.it) && (tmp = tmp._) && tmp.via))) || ((tmp = mesh.last) && ack === tmp['#'] && mesh.leap) } // warning! mesh.leap could be buggy! mesh last check reduces this.
                      if(!peer && ack){ // still no peer, then ack daisy chain lost.
                          if(dup.s[ack]){ return } // in dups but no peer hints that this was ack to self, ignore.
                          console.STAT && console.STAT(+new Date, ++SMIA, 'total no peer to ack to');
                          return false;
                      } // TODO: Temporary? If ack via trace has been lost, acks will go to all peers, which trashes browser bandwidth. Not relaying the ack will force sender to ask for ack again. Note, this is technically wrong for mesh behavior.
                      if(!peer && mesh.way){ return mesh.way(msg) }
                      if(!peer || !peer.id){
                          if(!Object.plain(peer || opt.peers)){ return false }
                          var S = +new Date;
                          var P = opt.puff, ps = opt.peers, pl = Object.keys(peer || opt.peers || {}); // TODO: .keys( is slow
                          console.STAT && console.STAT(S, +new Date - S, 'peer keys');
                          ;(function go(){
                              var S = +new Date;
                              //Type.obj.map(peer || opt.peers, each); // in case peer is a peer list.
                              loop = 1; var wr = meta.raw; meta.raw = raw; // quick perf hack
                              var i = 0, p; while(i < 9 && (p = (pl||'')[i++])){
                                  if(!(p = ps[p])){ continue }
                                  say(msg, p);
                              }
                              meta.raw = wr; loop = 0;
                              pl = pl.slice(i); // slicing after is faster than shifting during.
                              console.STAT && console.STAT(S, +new Date - S, 'say loop');
                              if(!pl.length){ return }
                              puff(go, 0);
                              dup_track(ack); // keep for later
                          }());
                          return;
                      }
                      // TODO: PERF: consider splitting function here, so say loops do less work.
                      if(!peer.wire && mesh.wire){ mesh.wire(peer) }
                      if(id === peer.last){ return } peer.last = id;  // was it just sent?
                      if(peer === meta.via){ return false } // don't send back to self.
                      if((tmp = meta.yo) && (tmp[peer.url] || tmp[peer.pid] || tmp[peer.id]) /*&& !o*/){ return false }
                      console.STAT && console.STAT(S, ((DBG||meta).yp = +new Date) - (meta.y || S), 'say prep');
                      ack && dup_track(ack); // streaming long responses needs to keep alive the ack.
                      if(peer.batch){
                          peer.tail = (tmp = peer.tail || 0) + raw.length;
                          if(peer.tail <= opt.pack){
                              peer.batch += (tmp?',':'')+raw;
                              return;
                          }
                          flush(peer);
                      }
                      peer.batch = '['; // Prevents double JSON!
                      var ST = +new Date;
                      setTimeout(function(){
                          console.STAT && console.STAT(ST, +new Date - ST, '0ms TO');
                          flush(peer);
                      }, opt.gap); // TODO: queuing/batching might be bad for low-latency video game performance! Allow opt out?
                      send(raw, peer);
                      console.STAT && (ack === peer.SI) && console.STAT(S, +new Date - peer.SH, 'say ack');
                  }
                  mesh.say.c = mesh.say.d = 0;
                  // TODO: this caused a out-of-memory crash!
                  mesh.raw = function(msg, peer){ // TODO: Clean this up / delete it / move logic out!
                      if(!msg){ return '' }
                      var meta = (msg._) || {}, put, tmp;
                      if(tmp = meta.raw){ return tmp }
                      if('string' == typeof msg){ return msg }
                      var hash = msg['##'], ack = msg['@'];
                      if(hash && ack){
                          dup_track(ack+hash);//.it = it(msg);
                          if((tmp = (dup.s[ack]||'').it) || ((tmp = mesh.last) && ack === tmp['#'])){
                              if(hash === tmp['##']){ return false }
                              tmp['##'] = hash;
                          }
                      }
                      if(!msg.dam){
                          var i = 0, to = []; tmp = opt.peers;
                          for(var k in tmp){ var p = tmp[k]; // TODO: Make it up peers instead!
                              to.push(p.url || p.pid || p.id);
                              if(++i > 6){ break }
                          }
                          if(i > 1){ msg['><'] = to.join() } // TODO: BUG! This gets set regardless of peers sent to! Detect?
                      }
                      if(put = meta.$put){
                          tmp = {}; Object.keys(msg).forEach(function(k){ tmp[k] = msg[k] });
                          tmp.put = ':])([:';
                          json(tmp, function(err, raw){
                              if(err){ return } // TODO: Handle!!
                              var S = +new Date;
                              tmp = raw.indexOf('"put":":])([:"');
                              res(u, raw = raw.slice(0, tmp+6) + put + raw.slice(tmp + 14));
                              console.STAT && console.STAT(S, +new Date - S, 'say slice');
                          });
                          return;
                      }
                      json(msg, res);
                      function res(err, raw){
                          if(err){ return } // TODO: Handle!!
                          meta.raw = raw; //if(meta && (raw||'').length < (999 * 99)){ meta.raw = raw } // HNPERF: If string too big, don't keep in memory.
                          say(msg, peer);
                      }
                  }
              }());
  
              function flush(peer){
                  var tmp = peer.batch, t = 'string' == typeof tmp, l;
                  if(t){ tmp += ']' }// TODO: Prevent double JSON!
                  peer.batch = peer.tail = null;
                  if(!tmp){ return }
                  if(t? 3 > tmp.length : !tmp.length){ return } // TODO: ^
                  if(!t){try{tmp = (1 === tmp.length? tmp[0] : JSON.stringify(tmp));
                  }catch(e){return opt.log('DAM JSON stringify error', e)}}
                  if(!tmp){ return }
                  send(tmp, peer);
              }
              // for now - find better place later.
              function send(raw, peer){ try{
                  //console.log('SAY:', peer.id, (raw||'').slice(0,250), ((raw||'').length / 1024 / 1024).toFixed(4));
                  var wire = peer.wire;
                  if(peer.say){
                      peer.say(raw);
                  } else
                  if(wire.send){
                      wire.send(raw);
                  }
                  mesh.say.d += raw.length||0; ++mesh.say.c; // STATS!
              }catch(e){
                  (peer.queue = peer.queue || []).push(raw);
              }}
  
              mesh.hi = function(peer){
                  var tmp = peer.wire || {};
                  if(peer.id){
                      opt.peers[peer.url || peer.id] = peer;
                  } else {
                      tmp = peer.id = peer.id || String.random(9);
                      mesh.say({dam: '?', pid: root.opt.pid}, opt.peers[tmp] = peer);
                      delete dup.s[peer.last]; // IMPORTANT: see https://gun.eco/docs/DAM#self
                  }
                  peer.met = peer.met || +(new Date);
                  if(!tmp.hied){ root.on(tmp.hied = 'hi', peer) }
                  // @rogowski I need this here by default for now to fix go1dfish's bug
                  tmp = peer.queue; peer.queue = [];
                  setTimeout.each(tmp||[],function(msg){
                      send(msg, peer);
                  },0,9);
                  //Type.obj.native && Type.obj.native(); // dirty place to check if other JS polluted.
              }
              mesh.bye = function(peer){
                  root.on('bye', peer);
                  var tmp = +(new Date); tmp = (tmp - (peer.met||tmp));
                  mesh.bye.time = ((mesh.bye.time || tmp) + tmp) / 2;
              }
              mesh.hear['!'] = function(msg, peer){ opt.log('Error:', msg.err) }
              mesh.hear['?'] = function(msg, peer){
                  if(msg.pid){
                      if(!peer.pid){ peer.pid = msg.pid }
                      if(msg['@']){ return }
                  }
                  mesh.say({dam: '?', pid: opt.pid, '@': msg['#']}, peer);
                  delete dup.s[peer.last]; // IMPORTANT: see https://gun.eco/docs/DAM#self
              }
  
              root.on('create', function(root){
                  root.opt.pid = root.opt.pid || String.random(9);
                  this.to.next(root);
                  root.on('out', mesh.say);
              });
  
              root.on('bye', function(peer, tmp){
                  peer = opt.peers[peer.id || peer] || peer;
                  this.to.next(peer);
                  peer.bye? peer.bye() : (tmp = peer.wire) && tmp.close && tmp.close();
                  delete opt.peers[peer.id];
                  peer.wire = null;
              });
  
              var gets = {};
              root.on('bye', function(peer, tmp){ this.to.next(peer);
                  if(tmp = console.STAT){ tmp.peers = (tmp.peers || 0) - 1; }
                  if(!(tmp = peer.url)){ return } gets[tmp] = true;
                  setTimeout(function(){ delete gets[tmp] },opt.lack || 9000);
              });
              root.on('hi', function(peer, tmp){ this.to.next(peer);
                  if(tmp = console.STAT){ tmp.peers = (tmp.peers || 0) + 1 }
                  if(!(tmp = peer.url) || !gets[tmp]){ return } delete gets[tmp];
                  if(opt.super){ return } // temporary (?) until we have better fix/solution?
                  setTimeout.each(Object.keys(root.next), function(soul){ var node = root.next[soul]; // TODO: .keys( is slow
                      tmp = {}; tmp[soul] = root.graph[soul]; tmp = String.hash(tmp); // TODO: BUG! This is broken.
                      mesh.say({'##': tmp, get: {'#': soul}}, peer);
                  });
              });
  
              return mesh;
          }
        var empty = {}, ok = true, u;
  
        try{ module.exports = Mesh }catch(e){}
  
      })(USE, './mesh');
  
      ;USE(function(module){
          var Gun = USE('../index');
          Gun.Mesh = USE('./mesh');
  
          Gun.on('opt', function(root){
              this.to.next(root);
              if(root.once){ return }
              var opt = root.opt;
              if(false === opt.WebSocket){ return }
  
              var env = Gun.window || {};
              var websocket = opt.WebSocket || env.WebSocket || env.webkitWebSocket || env.mozWebSocket;
              if(!websocket){ return }
              opt.WebSocket = websocket;
  
              var mesh = opt.mesh = opt.mesh || Gun.Mesh(root);
  
              var wire = mesh.wire || opt.wire;
              mesh.wire = opt.wire = open;
              function open(peer){ try{
                  if(!peer || !peer.url){ return wire && wire(peer) }
                  var url = peer.url.replace(/^http/, 'ws');
                  var wire = peer.wire = new opt.WebSocket(url);
                  wire.onclose = function(){
                      opt.mesh.bye(peer);
                      reconnect(peer);
                  };
                  wire.onerror = function(error){
                      reconnect(peer);
                  };
                  wire.onopen = function(){
                      opt.mesh.hi(peer);
                  }
                  wire.onmessage = function(msg){
                      if(!msg){ return }
                      opt.mesh.hear(msg.data || msg, peer);
                  };
                  return wire;
              }catch(e){}}
  
              setTimeout(function(){ !opt.super && root.on('out', {dam:'hi'}) },1); // it can take a while to open a socket, so maybe no longer lazy load for perf reasons?
  
              var wait = 2 * 999;
              function reconnect(peer){
                  clearTimeout(peer.defer);
                  if(doc && peer.retry <= 0){ return }
                  peer.retry = (peer.retry || opt.retry+1 || 60) - ((-peer.tried + (peer.tried = +new Date) < wait*4)?1:0);
                  peer.defer = setTimeout(function to(){
                      if(doc && doc.hidden){ return setTimeout(to,wait) }
                      open(peer);
                  }, wait);
              }
              var doc = (''+u !== typeof document) && document;
          });
          var noop = function(){}, u;
      })(USE, './websocket');
  
      ;USE(function(module){
          if(typeof Gun === 'undefined'){ return }
  
          var noop = function(){}, store, u;
          try{store = (Gun.window||noop).localStorage}catch(e){}
          if(!store){
              Gun.log("Warning: No localStorage exists to persist data to!");
              store = {setItem: function(k,v){this[k]=v}, removeItem: function(k){delete this[k]}, getItem: function(k){return this[k]}};
          }
          Gun.on('create', function lg(root){
              this.to.next(root);
              var opt = root.opt, graph = root.graph, acks = [], disk, to;
              if(false === opt.localStorage){ return }
              opt.prefix = opt.file || 'gun/';
              try{ disk = lg[opt.prefix] = lg[opt.prefix] || JSON.parse(store.getItem(opt.prefix)) || {}; // TODO: Perf! This will block, should we care, since limited to 5MB anyways?
              }catch(e){ disk = lg[opt.prefix] = {}; }
  
              root.on('get', function(msg){
                  this.to.next(msg);
                  var lex = msg.get, soul, data, tmp, u;
                  if(!lex || !(soul = lex['#'])){ return }
                  data = disk[soul] || u;
                  if(data && (tmp = lex['.']) && !Object.plain(tmp)){ // pluck!
                      data = Gun.state.ify({}, tmp, Gun.state.is(data, tmp), data[tmp], soul);
                  }
                  if(data){ (tmp = {})[soul] = data } // back into a graph.
                  //setTimeout(function(){	
                  root.on('in', {'@': msg['#'], put: tmp, lS:1});// || root.$});
                  //}, Math.random() * 10); // FOR TESTING PURPOSES!
              });
  
              root.on('put', function(msg){
                  this.to.next(msg); // remember to call next middleware adapter
                  var put = msg.put, soul = put['#'], key = put['.'], tmp; // pull data off wire envelope
                  disk[soul] = Gun.state.ify(disk[soul], key, put['>'], put[':'], soul); // merge into disk object
                  if(!msg['@']){ acks.push(msg['#']) } // then ack any non-ack write. // TODO: use batch id.
                  if(to){ return }
                  to = setTimeout(flush, opt.wait || 1); // that gets saved as a whole to disk every 1ms
              });
              function flush(){
                  var err, ack = acks; clearTimeout(to); to = false; acks = [];
                  try{store.setItem(opt.prefix, JSON.stringify(disk));
                  }catch(e){
                      Gun.log((err = (e || "localStorage failure")) + " Consider using GUN's IndexedDB plugin for RAD for more storage space, https://gun.eco/docs/RAD#install");
                      root.on('localStorage:error', {err: err, get: opt.prefix, put: disk});
                  }
                  if(!err && !Object.empty(opt.peers)){ return } // only ack if there are no peers. // Switch this to probabilistic mode
                  setTimeout.each(ack, function(id){
                      root.on('in', {'@': id, err: err, ok: 0}); // localStorage isn't reliable, so make its `ok` code be a low number.
                  });
              }
          
          });
      })(USE, './localStorage');
  
  }());
  ;(function(){
	// Generic javascript utilities.
	var Type = Gun;
	//Type.fns = Type.fn = {is: function(fn){ return (!!fn && fn instanceof Function) }}
	Type.fn = {is: function(fn){ return (!!fn && 'function' == typeof fn) }}
	Type.bi = {is: function(b){ return (b instanceof Boolean || typeof b == 'boolean') }}
	Type.num = {is: function(n){ return !list_is(n) && ((n - parseFloat(n) + 1) >= 0 || Infinity === n || -Infinity === n) }}
	Type.text = {is: function(t){ return (typeof t == 'string') }}
	Type.text.ify = function(t){
		if(Type.text.is(t)){ return t }
		if(typeof JSON !== "undefined"){ return JSON.stringify(t) }
		return (t && t.toString)? t.toString() : t;
	}
	Type.text.random = function(l, c){
		var s = '';
		l = l || 24; // you are not going to make a 0 length random number, so no need to check type
		c = c || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz';
		while(l > 0){ s += c.charAt(Math.floor(Math.random() * c.length)); l-- }
		return s;
	}
	Type.text.match = function(t, o){ var tmp, u;
		if('string' !== typeof t){ return false }
		if('string' == typeof o){ o = {'=': o} }
		o = o || {};
		tmp = (o['='] || o['*'] || o['>'] || o['<']);
		if(t === tmp){ return true }
		if(u !== o['=']){ return false }
		tmp = (o['*'] || o['>'] || o['<']);
		if(t.slice(0, (tmp||'').length) === tmp){ return true }
		if(u !== o['*']){ return false }
		if(u !== o['>'] && u !== o['<']){
			return (t >= o['>'] && t <= o['<'])? true : false;
		}
		if(u !== o['>'] && t >= o['>']){ return true }
		if(u !== o['<'] && t <= o['<']){ return true }
		return false;
	}
	Type.text.hash = function(s, c){ // via SO
		if(typeof s !== 'string'){ return }
	  c = c || 0;
	  if(!s.length){ return c }
	  for(var i=0,l=s.length,n; i<l; ++i){
	    n = s.charCodeAt(i);
	    c = ((c<<5)-c)+n;
	    c |= 0;
	  }
	  return c;
	}
	Type.list = {is: function(l){ return (l instanceof Array) }}
	Type.list.slit = Array.prototype.slice;
	Type.list.sort = function(k){ // creates a new sort function based off some key
		return function(A,B){
			if(!A || !B){ return 0 } A = A[k]; B = B[k];
			if(A < B){ return -1 }else if(A > B){ return 1 }
			else { return 0 }
		}
	}
	Type.list.map = function(l, c, _){ return obj_map(l, c, _) }
	Type.list.index = 1; // change this to 0 if you want non-logical, non-mathematical, non-matrix, non-convenient array notation
	Type.obj = {is: function(o){ return o? (o instanceof Object && o.constructor === Object) || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === 'Object' : false }}
	Type.obj.put = function(o, k, v){ return (o||{})[k] = v, o }
	Type.obj.has = function(o, k){ return o && Object.prototype.hasOwnProperty.call(o, k) }
	Type.obj.del = function(o, k){
		if(!o){ return }
		o[k] = null;
		delete o[k];
		return o;
	}
	Type.obj.as = function(o, k, v, u){ return o[k] = o[k] || (u === v? {} : v) }
	Type.obj.ify = function(o){
		if(obj_is(o)){ return o }
		try{o = JSON.parse(o);
		}catch(e){o={}};
		return o;
	}
	;(function(){ var u;
		function map(v,k){
			if(obj_has(this,k) && u !== this[k]){ return }
			this[k] = v;
		}
		Type.obj.to = function(from, to){
			to = to || {};
			obj_map(from, map, to);
			return to;
		}
	}());
	Type.obj.copy = function(o){ // because http://web.archive.org/web/20140328224025/http://jsperf.com/cloning-an-object/2
		return !o? o : JSON.parse(JSON.stringify(o)); // is shockingly faster than anything else, and our data has to be a subset of JSON anyways!
	}
	;(function(){
		function empty(v,i){ var n = this.n, u;
			if(n && (i === n || (obj_is(n) && obj_has(n, i)))){ return }
			if(u !== i){ return true }
		}
		Type.obj.empty = function(o, n){
			if(!o){ return true }
			return obj_map(o,empty,{n:n})? false : true;
		}
	}());
	;(function(){
		function t(k,v){
			if(2 === arguments.length){
				t.r = t.r || {};
				t.r[k] = v;
				return;
			} t.r = t.r || [];
			t.r.push(k);
		};
		var keys = Object.keys, map, u;
		Object.keys = Object.keys || function(o){ return map(o, function(v,k,t){t(k)}) }
		Type.obj.map = map = function(l, c, _){
			var u, i = 0, x, r, ll, lle, f = 'function' == typeof c;
			t.r = u;
			if(keys && obj_is(l)){
				ll = keys(l); lle = true;
			}
			_ = _ || {};
			if(list_is(l) || ll){
				x = (ll || l).length;
				for(;i < x; i++){
					var ii = (i + Type.list.index);
					if(f){
						r = lle? c.call(_, l[ll[i]], ll[i], t) : c.call(_, l[i], ii, t);
						if(r !== u){ return r }
					} else {
						//if(Type.test.is(c,l[i])){ return ii } // should implement deep equality testing!
						if(c === l[lle? ll[i] : i]){ return ll? ll[i] : ii } // use this for now
					}
				}
			} else {
				for(i in l){
					if(f){
						if(obj_has(l,i)){
							r = _? c.call(_, l[i], i, t) : c(l[i], i, t);
							if(r !== u){ return r }
						}
					} else {
						//if(a.test.is(c,l[i])){ return i } // should implement deep equality testing!
						if(c === l[i]){ return i } // use this for now
					}
				}
			}
			return f? t.r : Type.list.index? 0 : -1;
		}
	}());
	Type.time = {};
	Type.time.is = function(t){ return t? t instanceof Date : (+new Date().getTime()) }

	var fn_is = Type.fn.is;
	var list_is = Type.list.is;
	var obj = Type.obj, obj_is = obj.is, obj_has = obj.has, obj_map = obj.map;

	var Val = {};
	Val.is = function(v){ // Valid values are a subset of JSON: null, binary, number (!Infinity), text, or a soul relation. Arrays need special algorithms to handle concurrency, so they are not supported directly. Use an extension that supports them if needed but research their problems first.
		if(v === u){ return false }
		if(v === null){ return true } // "deletes", nulling out keys.
		if(v === Infinity){ return false } // we want this to be, but JSON does not support it, sad face.
		if(text_is(v) // by "text" we mean strings.
		|| bi_is(v) // by "binary" we mean boolean.
		|| num_is(v)){ // by "number" we mean integers or decimals.
			return true; // simple values are valid.
		}
		return Val.link.is(v) || false; // is the value a soul relation? Then it is valid and return it. If not, everything else remaining is an invalid data type. Custom extensions can be built on top of these primitives to support other types.
	}
	Val.link = Val.rel = {_: '#'};
	;(function(){
		Val.link.is = function(v){ // this defines whether an object is a soul relation or not, they look like this: {'#': 'UUID'}
			if(v && v[rel_] && !v._ && obj_is(v)){ // must be an object.
				var o = {};
				obj_map(v, map, o);
				if(o.id){ // a valid id was found.
					return o.id; // yay! Return it.
				}
			}
			return false; // the value was not a valid soul relation.
		}
		function map(s, k){ var o = this; // map over the object...
			if(o.id){ return o.id = false } // if ID is already defined AND we're still looping through the object, it is considered invalid.
			if(k == rel_ && text_is(s)){ // the key should be '#' and have a text value.
				o.id = s; // we found the soul!
			} else {
				return o.id = false; // if there exists anything else on the object that isn't the soul, then it is considered invalid.
			}
		}
	}());
	Val.link.ify = function(t){ return obj_put({}, rel_, t) } // convert a soul into a relation and return it.
	Type.obj.has._ = '.';
	var rel_ = Val.link._, u;
	var bi_is = Type.bi.is;
	var num_is = Type.num.is;
	var text_is = Type.text.is;
	var obj = Type.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map;

	Type.val = Val;

	var Node = {_: '_'};
	Node.soul = function(n, o){ return (n && n._ && n._[o || soul_]) } // convenience function to check to see if there is a soul on a node and return it.
	Node.soul.ify = function(n, o){ // put a soul on an object.
		o = (typeof o === 'string')? {soul: o} : o || {};
		n = n || {}; // make sure it exists.
		n._ = n._ || {}; // make sure meta exists.
		n._[soul_] = o.soul || n._[soul_] || text_random(); // put the soul on it.
		return n;
	}
	Node.soul._ = Val.link._;
	;(function(){
		Node.is = function(n, cb, as){ var s; // checks to see if an object is a valid node.
			if(!obj_is(n)){ return false } // must be an object.
			if(s = Node.soul(n)){ // must have a soul on it.
				return !obj_map(n, map, {as:as,cb:cb,s:s,n:n});
			}
			return false; // nope! This was not a valid node.
		}
		function map(v, k){ // we invert this because the way we check for this is via a negation.
			if(k === Node._){ return } // skip over the metadata.
			if(!Val.is(v)){ return true } // it is true that this is an invalid node.
			if(this.cb){ this.cb.call(this.as, v, k, this.n, this.s) } // optionally callback each key/value.
		}
	}());
	;(function(){
		Node.ify = function(obj, o, as){ // returns a node from a shallow object.
			if(!o){ o = {} }
			else if(typeof o === 'string'){ o = {soul: o} }
			else if('function' == typeof o){ o = {map: o} }
			if(o.map){ o.node = o.map.call(as, obj, u, o.node || {}) }
			if(o.node = Node.soul.ify(o.node || {}, o)){
				obj_map(obj, map, {o:o,as:as});
			}
			return o.node; // This will only be a valid node if the object wasn't already deep!
		}
		function map(v, k){ var o = this.o, tmp, u; // iterate over each key/value.
			if(o.map){
				tmp = o.map.call(this.as, v, ''+k, o.node);
				if(u === tmp){
					obj_del(o.node, k);
				} else
				if(o.node){ o.node[k] = tmp }
				return;
			}
			if(Val.is(v)){
				o.node[k] = v;
			}
		}
	}());
	var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_map = obj.map;
	var text = Type.text, text_random = text.random;
	var soul_ = Node.soul._;
	var u;
	Type.node = Node;

	var State = Type.state;
	State.lex = function(){ return State().toString(36).replace('.','') }
	State.to = function(from, k, to){
		var val = (from||{})[k];
		if(obj_is(val)){
			val = obj_copy(val);
		}
		return State.ify(to, k, State.is(from, k), val, Node.soul(from));
	}
	;(function(){
		State.map = function(cb, s, as){ var u; // for use with Node.ify
			var o = obj_is(o = cb || s)? o : null;
			cb = fn_is(cb = cb || s)? cb : null;
			if(o && !cb){
				s = num_is(s)? s : State();
				o[N_] = o[N_] || {};
				obj_map(o, map, {o:o,s:s});
				return o;
			}
			as = as || obj_is(s)? s : u;
			s = num_is(s)? s : State();
			return function(v, k, o, opt){
				if(!cb){
					map.call({o: o, s: s}, v,k);
					return v;
				}
				cb.call(as || this || {}, v, k, o, opt);
				if(obj_has(o,k) && u === o[k]){ return }
				map.call({o: o, s: s}, v,k);
			}
		}
		function map(v,k){
			if(N_ === k){ return }
			State.ify(this.o, k, this.s) ;
		}
	}());
	var obj = Type.obj, obj_as = obj.as, obj_has = obj.has, obj_is = obj.is, obj_map = obj.map, obj_copy = obj.copy;
	var num = Type.num, num_is = num.is;
	var fn = Type.fn, fn_is = fn.is;
	var N_ = Node._, u;

	var Graph = {};
	;(function(){
		Graph.is = function(g, cb, fn, as){ // checks to see if an object is a valid graph.
			if(!g || !obj_is(g) || obj_empty(g)){ return false } // must be an object.
			return !obj_map(g, map, {cb:cb,fn:fn,as:as}); // makes sure it wasn't an empty object.
		}
		function map(n, s){ // we invert this because the way'? we check for this is via a negation.
			if(!n || s !== Node.soul(n) || !Node.is(n, this.fn, this.as)){ return true } // it is true that this is an invalid graph.
			if(!this.cb){ return }
			nf.n = n; nf.as = this.as; // sequential race conditions aren't races.
			this.cb.call(nf.as, n, s, nf);
		}
		function nf(fn){ // optional callback for each node.
			if(fn){ Node.is(nf.n, fn, nf.as) } // where we then have an optional callback for each key/value.
		}
	}());
	;(function(){
		Graph.ify = function(obj, env, as){
			var at = {path: [], obj: obj};
			if(!env){
				env = {};
			} else
			if(typeof env === 'string'){
				env = {soul: env};
			} else
			if('function' == typeof env){
				env.map = env;
			}
			if(typeof as === 'string'){
				env.soul = env.soul || as;
				as = u;
			}
			if(env.soul){
				at.link = Val.link.ify(env.soul);
			}
			env.shell = (as||{}).shell;
			env.graph = env.graph || {};
			env.seen = env.seen || [];
			env.as = env.as || as;
			node(env, at);
			env.root = at.node;
			return env.graph;
		}
		function node(env, at){ var tmp;
			if(tmp = seen(env, at)){ return tmp }
			at.env = env;
			at.soul = soul;
			if(Node.ify(at.obj, map, at)){
				at.link = at.link || Val.link.ify(Node.soul(at.node));
				if(at.obj !== env.shell){
					env.graph[Val.link.is(at.link)] = at.node;
				}
			}
			return at;
		}
		function map(v,k,n){
			var at = this, env = at.env, is, tmp;
			if(Node._ === k && obj_has(v,Val.link._)){
				return n._; // TODO: Bug?
			}
			if(!(is = valid(v,k,n, at,env))){ return }
			if(!k){
				at.node = at.node || n || {};
				if(obj_has(v, Node._) && Node.soul(v)){ // ? for safety ?
					at.node._ = obj_copy(v._);
				}
				at.node = Node.soul.ify(at.node, Val.link.is(at.link));
				at.link = at.link || Val.link.ify(Node.soul(at.node));
			}
			if(tmp = env.map){
				tmp.call(env.as || {}, v,k,n, at);
				if(obj_has(n,k)){
					v = n[k];
					if(u === v){
						obj_del(n, k);
						return;
					}
					if(!(is = valid(v,k,n, at,env))){ return }
				}
			}
			if(!k){ return at.node }
			if(true === is){
				return v;
			}
			tmp = node(env, {obj: v, path: at.path.concat(k)});
			if(!tmp.node){ return }
			return tmp.link; //{'#': Node.soul(tmp.node)};
		}
		function soul(id){ var at = this;
			var prev = Val.link.is(at.link), graph = at.env.graph;
			at.link = at.link || Val.link.ify(id);
			at.link[Val.link._] = id;
			if(at.node && at.node[Node._]){
				at.node[Node._][Val.link._] = id;
			}
			if(obj_has(graph, prev)){
				graph[id] = graph[prev];
				obj_del(graph, prev);
			}
		}
		function valid(v,k,n, at,env){ var tmp;
			if(Val.is(v)){ return true }
			if(obj_is(v)){ return 1 }
			if(tmp = env.invalid){
				v = tmp.call(env.as || {}, v,k,n);
				return valid(v,k,n, at,env);
			}
			env.err = "Invalid value at '" + at.path.concat(k).join('.') + "'!";
			if(Type.list.is(v)){ env.err += " Use `.set(item)` instead of an Array." }
		}
		function seen(env, at){
			var arr = env.seen, i = arr.length, has;
			while(i--){ has = arr[i];
				if(at.obj === has.obj){ return has }
			}
			arr.push(at);
		}
	}());
	Graph.node = function(node){
		var soul = Node.soul(node);
		if(!soul){ return }
		return obj_put({}, soul, node);
	}
	;(function(){
		Graph.to = function(graph, root, opt){
			if(!graph){ return }
			var obj = {};
			opt = opt || {seen: {}};
			obj_map(graph[root], map, {obj:obj, graph: graph, opt: opt});
			return obj;
		}
		function map(v,k){ var tmp, obj;
			if(Node._ === k){
				if(obj_empty(v, Val.link._)){
					return;
				}
				this.obj[k] = obj_copy(v);
				return;
			}
			if(!(tmp = Val.link.is(v))){
				this.obj[k] = v;
				return;
			}
			if(obj = this.opt.seen[tmp]){
				this.obj[k] = obj;
				return;
			}
			this.obj[k] = this.opt.seen[tmp] = Graph.to(this.graph, tmp, this.opt);
		}
	}());
	var fn_is = Type.fn.is;
	var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_has = obj.has, obj_empty = obj.empty, obj_put = obj.put, obj_map = obj.map, obj_copy = obj.copy;
	var u;
	Type.graph = Graph;
}());  
! function (e) {
    var t = {};
    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) r.d(n, o, function (t) {
                return e[t]
            }.bind(null, o));
        return n
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 13)
}([function (e, t, r) {
    e.exports = r(7)
}, function (e, t) {
    function r(e, t, r, n, o, i, a) {
        try {
            var s = e[i](a),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    e.exports = function (e) {
        return function () {
            var t = this,
                n = arguments;
            return new Promise((function (o, i) {
                var a = e.apply(t, n);

                function s(e) {
                    r(a, o, i, s, c, "next", e)
                }

                function c(e) {
                    r(a, o, i, s, c, "throw", e)
                }
                s(void 0)
            }))
        }
    }
}, function (e, t) {
    function r(t) {
        return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e.exports = r = function (e) {
            return typeof e
        } : e.exports = r = function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r(t)
    }
    e.exports = r
}, function (e, t) {
    e.exports = function (e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
}, function (e, t, r) {
    var n = r(8),
        o = r(9),
        i = r(10),
        a = r(11);
    e.exports = function (e) {
        return n(e) || o(e) || i(e) || a()
    }
}, function (e, t) {
    e.exports = function (e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function () {
        return {
            uid: "",
            birthday: "",
            cellPhone: "",
            pagerPhone: "",
            email: "",
            workEmail: "",
            firstName: "",
            formattedName: "",
            gender: "",
            homeAddress: {
                label: "",
                street: "",
                city: "",
                stateProvince: "",
                postalCode: "",
                countryRegion: ""
            },
            homePhone: "",
            homeFax: "",
            lastName: "",
            logo: {
                url: "",
                mediaType: "",
                base64: !1,
                attachFromUrl: function (e, t) {
                    this.url = e, this.mediaType = t, this.base64 = !1
                },
                embedFromString: function (e, t) {
                    this.mediaType = t, this.url = e, this.base64 = !0
                }
            },
            middleName: "",
            namePrefix: "",
            nameSuffix: "",
            nickname: "",
            note: "",
            organization: "",
            photo: {
                url: "",
                mediaType: "",
                base64: !1,
                attachFromUrl: function (e, t) {
                    this.url = e, this.mediaType = t, this.base64 = !1
                },
                embedFromString: function (e, t) {
                    this.mediaType = t, this.url = e, this.base64 = !0
                }
            },
            role: "",
            socialUrls: {
                facebook: "",
                linkedIn: "",
                twitter: "",
                flickr: ""
            },
            source: "",
            title: "",
            url: "",
            workUrl: "",
            workAddress: {
                label: "",
                street: "",
                city: "",
                stateProvince: "",
                postalCode: "",
                countryRegion: ""
            },
            workPhone: "",
            workFax: "",
            version: "3.0",
            getMajorVersion: function () {
                var e = this.version ? this.version.split(".")[0] : "4";
                return isNaN(e) ? 4 : parseInt(e)
            },
            getFormattedString: function () {
                return r(12).getFormattedString(this)
            }
        }
    }
}, function (e, t, r) {
    var n = function (e) {
        "use strict";
        var t = Object.prototype,
            r = t.hasOwnProperty,
            n = "function" == typeof Symbol ? Symbol : {},
            o = n.iterator || "@@iterator",
            i = n.asyncIterator || "@@asyncIterator",
            a = n.toStringTag || "@@toStringTag";

        function s(e, t, r) {
            return Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), e[t]
        }
        try {
            s({}, "")
        } catch (e) {
            s = function (e, t, r) {
                return e[t] = r
            }
        }

        function c(e, t, r, n) {
            var o = t && t.prototype instanceof p ? t : p,
                i = Object.create(o.prototype),
                a = new E(n || []);
            return i._invoke = function (e, t, r) {
                var n = "suspendedStart";
                return function (o, i) {
                    if ("executing" === n) throw new Error("Generator is already running");
                    if ("completed" === n) {
                        if ("throw" === o) throw i;
                        return A()
                    }
                    for (r.method = o, r.arg = i;;) {
                        var a = r.delegate;
                        if (a) {
                            var s = w(a, r);
                            if (s) {
                                if (s === u) continue;
                                return s
                            }
                        }
                        if ("next" === r.method) r.sent = r._sent = r.arg;
                        else if ("throw" === r.method) {
                            if ("suspendedStart" === n) throw n = "completed", r.arg;
                            r.dispatchException(r.arg)
                        } else "return" === r.method && r.abrupt("return", r.arg);
                        n = "executing";
                        var c = l(e, t, r);
                        if ("normal" === c.type) {
                            if (n = r.done ? "completed" : "suspendedYield", c.arg === u) continue;
                            return {
                                value: c.arg,
                                done: r.done
                            }
                        }
                        "throw" === c.type && (n = "completed", r.method = "throw", r.arg = c.arg)
                    }
                }
            }(e, r, a), i
        }

        function l(e, t, r) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, r)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        e.wrap = c;
        var u = {};

        function p() {}

        function f() {}

        function d() {}
        var h = {};
        h[o] = function () {
            return this
        };
        var y = Object.getPrototypeOf,
            m = y && y(y(P([])));
        m && m !== t && r.call(m, o) && (h = m);
        var g = d.prototype = p.prototype = Object.create(h);

        function v(e) {
            ["next", "throw", "return"].forEach((function (t) {
                s(e, t, (function (e) {
                    return this._invoke(t, e)
                }))
            }))
        }

        function b(e, t) {
            var n;
            this._invoke = function (o, i) {
                function a() {
                    return new t((function (n, a) {
                        ! function n(o, i, a, s) {
                            var c = l(e[o], e, i);
                            if ("throw" !== c.type) {
                                var u = c.arg,
                                    p = u.value;
                                return p && "object" == typeof p && r.call(p, "__await") ? t.resolve(p.__await).then((function (e) {
                                    n("next", e, a, s)
                                }), (function (e) {
                                    n("throw", e, a, s)
                                })) : t.resolve(p).then((function (e) {
                                    u.value = e, a(u)
                                }), (function (e) {
                                    return n("throw", e, a, s)
                                }))
                            }
                            s(c.arg)
                        }(o, i, n, a)
                    }))
                }
                return n = n ? n.then(a, a) : a()
            }
        }

        function w(e, t) {
            var r = e.iterator[t.method];
            if (void 0 === r) {
                if (t.delegate = null, "throw" === t.method) {
                    if (e.iterator.return && (t.method = "return", t.arg = void 0, w(e, t), "throw" === t.method)) return u;
                    t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return u
            }
            var n = l(r, e.iterator, t.arg);
            if ("throw" === n.type) return t.method = "throw", t.arg = n.arg, t.delegate = null, u;
            var o = n.arg;
            return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, u) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, u)
        }

        function x(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function k(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function E(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(x, this), this.reset(!0)
        }

        function P(e) {
            if (e) {
                var t = e[o];
                if (t) return t.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var n = -1,
                        i = function t() {
                            for (; ++n < e.length;)
                                if (r.call(e, n)) return t.value = e[n], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t
                        };
                    return i.next = i
                }
            }
            return {
                next: A
            }
        }

        function A() {
            return {
                value: void 0,
                done: !0
            }
        }
        return f.prototype = g.constructor = d, d.constructor = f, f.displayName = s(d, a, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === f || "GeneratorFunction" === (t.displayName || t.name))
        }, e.mark = function (e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, s(e, a, "GeneratorFunction")), e.prototype = Object.create(g), e
        }, e.awrap = function (e) {
            return {
                __await: e
            }
        }, v(b.prototype), b.prototype[i] = function () {
            return this
        }, e.AsyncIterator = b, e.async = function (t, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new b(c(t, r, n, o), i);
            return e.isGeneratorFunction(r) ? a : a.next().then((function (e) {
                return e.done ? e.value : a.next()
            }))
        }, v(g), s(g, a, "Generator"), g[o] = function () {
            return this
        }, g.toString = function () {
            return "[object Generator]"
        }, e.keys = function (e) {
            var t = [];
            for (var r in e) t.push(r);
            return t.reverse(),
                function r() {
                    for (; t.length;) {
                        var n = t.pop();
                        if (n in e) return r.value = n, r.done = !1, r
                    }
                    return r.done = !0, r
                }
        }, e.values = P, E.prototype = {
            constructor: E,
            reset: function (e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(k), !e)
                    for (var t in this) "t" === t.charAt(0) && r.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
            },
            stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function (e) {
                if (this.done) throw e;
                var t = this;

                function n(r, n) {
                    return a.type = "throw", a.arg = e, t.next = r, n && (t.method = "next", t.arg = void 0), !!n
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var i = this.tryEntries[o],
                        a = i.completion;
                    if ("root" === i.tryLoc) return n("end");
                    if (i.tryLoc <= this.prev) {
                        var s = r.call(i, "catchLoc"),
                            c = r.call(i, "finallyLoc");
                        if (s && c) {
                            if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                            if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                        } else if (s) {
                            if (this.prev < i.catchLoc) return n(i.catchLoc, !0)
                        } else {
                            if (!c) throw new Error("try statement without catch or finally");
                            if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var o = this.tryEntries[n];
                    if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                        var i = o;
                        break
                    }
                }
                i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, u) : this.complete(a)
            },
            complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), u
            },
            finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), k(r), u
                }
            },
            catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.tryLoc === e) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            k(r)
                        }
                        return o
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function (e, t, r) {
                return this.delegate = {
                    iterator: P(e),
                    resultName: t,
                    nextLoc: r
                }, "next" === this.method && (this.arg = void 0), u
            }
        }, e
    }(e.exports);
    try {
        regeneratorRuntime = n
    } catch (e) {
        Function("r", "regeneratorRuntime = r")(n)
    }
}, function (e, t, r) {
    var n = r(5);
    e.exports = function (e) {
        if (Array.isArray(e)) return n(e)
    }
}, function (e, t) {
    e.exports = function (e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
    }
}, function (e, t, r) {
    var n = r(5);
    e.exports = function (e, t) {
        if (e) {
            if ("string" == typeof e) return n(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0
        }
    }
}, function (e, t) {
    e.exports = function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
}, function (e, t, r) {
    "use strict";
    ! function () {
        var t = "3";

        function r(e) {
            return e ? ("string" != typeof e && (e = "" + e), e.replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;")) : ""
        }

        function n(e, n, o, i) {
            return e + (t >= 4 ? i ? ";ENCODING=b;MEDIATYPE=image/" : ";MEDIATYPE=image/" : 3 === t ? i ? ";ENCODING=b;TYPE=" : ";TYPE=" : i ? ";ENCODING=BASE64;" : ";") + o + ":" + r(n) + "\r\n"
        }

        function o(e) {
            return e.getFullYear() + ("0" + (e.getMonth() + 1)).slice(-2) + ("0" + e.getDate()).slice(-2)
        }
        e.exports = {
            getFormattedString: function (e) {
                t = e.getMajorVersion();
                var i = "";
                i += "BEGIN:VCARD\r\n", i += "VERSION:" + e.version + "\r\n";
                var a = t >= 4 ? "" : ";CHARSET=UTF-8",
                    s = e.formattedName;
                if (s || (s = "", [e.firstName, e.middleName, e.lastName].forEach((function (e) {
                        e && s && (s += " "), s += e
                    }))), i += "FN" + a + ":" + r(s) + "\r\n", i += "N" + a + ":" + r(e.lastName) + ";" + r(e.firstName) + ";" + r(e.middleName) + ";" + r(e.namePrefix) + ";" + r(e.nameSuffix) + "\r\n", e.nickname && t >= 3 && (i += "NICKNAME" + a + ":" + r(e.nickname) + "\r\n"), e.gender && (i += "GENDER:" + r(e.gender) + "\r\n"), e.uid && (i += "UID" + a + ":" + r(e.uid) + "\r\n"), e.birthday && (i += "BDAY:" + o(e.birthday) + "\r\n"), e.anniversary && (i += "ANNIVERSARY:" + o(e.anniversary) + "\r\n"), e.email && (Array.isArray(e.email) || (e.email = [e.email]), e.email.forEach((function (e) {
                        i += t >= 4 ? "EMAIL" + a + ";type=HOME:" + r(e) + "\r\n" : t >= 3 && t < 4 ? "EMAIL" + a + ";type=HOME,INTERNET:" + r(e) + "\r\n" : "EMAIL" + a + ";HOME;INTERNET:" + r(e) + "\r\n"
                    }))), e.workEmail && (Array.isArray(e.workEmail) || (e.workEmail = [e.workEmail]), e.workEmail.forEach((function (e) {
                        i += t >= 4 ? "EMAIL" + a + ";type=WORK:" + r(e) + "\r\n" : t >= 3 && t < 4 ? "EMAIL" + a + ";type=WORK,INTERNET:" + r(e) + "\r\n" : "EMAIL" + a + ";WORK;INTERNET:" + r(e) + "\r\n"
                    }))), e.otherEmail && (Array.isArray(e.otherEmail) || (e.otherEmail = [e.otherEmail]), e.otherEmail.forEach((function (e) {
                        i += t >= 4 ? "EMAIL" + a + ";type=OTHER:" + r(e) + "\r\n" : t >= 3 && t < 4 ? "EMAIL" + a + ";type=OTHER,INTERNET:" + r(e) + "\r\n" : "EMAIL" + a + ";OTHER;INTERNET:" + r(e) + "\r\n"
                    }))), e.logo.url && (i += n("LOGO", e.logo.url, e.logo.mediaType, e.logo.base64)), e.photo.url && (i += n("PHOTO", e.photo.url, e.photo.mediaType, e.photo.base64)), e.cellPhone && (Array.isArray(e.cellPhone) || (e.cellPhone = [e.cellPhone]), e.cellPhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="voice,cell":tel:' + r(e) + "\r\n" : "TEL;TYPE=CELL:" + r(e) + "\r\n"
                    }))), e.pagerPhone && (Array.isArray(e.pagerPhone) || (e.pagerPhone = [e.pagerPhone]), e.pagerPhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="pager,cell":tel:' + r(e) + "\r\n" : "TEL;TYPE=PAGER:" + r(e) + "\r\n"
                    }))), e.homePhone && (Array.isArray(e.homePhone) || (e.homePhone = [e.homePhone]), e.homePhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="voice,home":tel:' + r(e) + "\r\n" : "TEL;TYPE=HOME,VOICE:" + r(e) + "\r\n"
                    }))), e.workPhone && (Array.isArray(e.workPhone) || (e.workPhone = [e.workPhone]), e.workPhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="voice,work":tel:' + r(e) + "\r\n" : "TEL;TYPE=WORK,VOICE:" + r(e) + "\r\n"
                    }))), e.homeFax && (Array.isArray(e.homeFax) || (e.homeFax = [e.homeFax]), e.homeFax.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="fax,home":tel:' + r(e) + "\r\n" : "TEL;TYPE=HOME,FAX:" + r(e) + "\r\n"
                    }))), e.workFax && (Array.isArray(e.workFax) || (e.workFax = [e.workFax]), e.workFax.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="fax,work":tel:' + r(e) + "\r\n" : "TEL;TYPE=WORK,FAX:" + r(e) + "\r\n"
                    }))), e.otherPhone && (Array.isArray(e.otherPhone) || (e.otherPhone = [e.otherPhone]), e.otherPhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="voice,other":tel:' + r(e) + "\r\n" : "TEL;TYPE=OTHER:" + r(e) + "\r\n"
                    }))), [{
                        details: e.homeAddress,
                        type: "HOME"
                    }, {
                        details: e.workAddress,
                        type: "WORK"
                    }].forEach((function (e) {
                        i += function (e, n) {
                            var o = "";
                            return (n.details.label || n.details.street || n.details.city || n.details.stateProvince || n.details.postalCode || n.details.countryRegion) && (t >= 4 ? o = "ADR" + e + ";TYPE=" + n.type + (n.details.label ? ';LABEL="' + r(n.details.label) + '"' : "") + ":;;" + r(n.details.street) + ";" + r(n.details.city) + ";" + r(n.details.stateProvince) + ";" + r(n.details.postalCode) + ";" + r(n.details.countryRegion) + "\r\n" : (n.details.label && (o = "LABEL" + e + ";TYPE=" + n.type + ":" + r(n.details.label) + "\r\n"), o += "ADR" + e + ";TYPE=" + n.type + ":;;" + r(n.details.street) + ";" + r(n.details.city) + ";" + r(n.details.stateProvince) + ";" + r(n.details.postalCode) + ";" + r(n.details.countryRegion) + "\r\n")), o
                        }(a, e)
                    })), e.title && (i += "TITLE" + a + ":" + r(e.title) + "\r\n"), e.role && (i += "ROLE" + a + ":" + r(e.role) + "\r\n"), e.organization && (i += "ORG" + a + ":" + r(e.organization) + "\r\n"), e.url && (i += "URL" + a + ":" + r(e.url) + "\r\n"), e.workUrl && (i += "URL;type=WORK" + a + ":" + r(e.workUrl) + "\r\n"), e.note && (i += "NOTE" + a + ":" + r(e.note) + "\r\n"), e.socialUrls)
                    for (var c in e.socialUrls) e.socialUrls.hasOwnProperty(c) && e.socialUrls[c] && (i += "X-SOCIALPROFILE;TYPE=" + c + ":" + r(e.socialUrls[c]) + "\r\n");
                return e.source && (i += "SOURCE" + a + ":" + r(e.source) + "\r\n"), i += "REV:" + (new Date).toISOString() + "\r\n", e.isOrganization && (i += "X-ABShowAs:COMPANY\r\n"), i += "END:VCARD\r\n"
            }
        }
    }()
}, function (e, t, r) {
    "use strict";
    r.r(t);
    var n = r(2),
        o = r.n(n),
        i = r(0),
        a = r.n(i),
        s = r(1),
        c = r.n(s),
        l = r(4),
        u = r.n(l),
        p = r(3),
        f = r.n(p),
        d = r(6),
        h = r.n(d),
        y = {
            basics: {
                name: "",
                label: "",
                picture: "",
                email: "",
                phone: "",
                website: "",
                summary: "",
                location: {
                    address: "",
                    postalCode: "",
                    city: "",
                    countryCode: "",
                    region: ""
                },
                profiles: []
            },
            work: [],
            volunteer: [],
            education: [],
            awards: [],
            publications: [],
            skills: [],
            languages: [],
            interests: [],
            references: []
        },
        m = {
            $schema: "https://json.schemastore.org/resume",
            basics: {
                name: "",
                label: "",
                image: "",
                email: "",
                phone: "",
                url: "",
                summary: "",
                location: {
                    address: "",
                    postalCode: "",
                    city: "",
                    countryCode: "",
                    region: ""
                },
                profiles: []
            },
            work: [],
            volunteer: [],
            education: [],
            awards: [],
            publications: [],
            skills: [],
            languages: [],
            interests: [],
            references: [],
            projects: [],
            meta: {
                version: "v0.1.3",
                canonical: "https://github.com/jsonresume/resume-schema/blob/v0.1.3/schema.json"
            }
        },
        g = {
            certificates: []
        },
        v = {
            profile: "*profile",
            certificates: "*certificationView",
            education: "*educationView",
            workPositions: "*positionView",
            workPositionGroups: "*positionGroupView",
            skills: "*skillView",
            projects: "*projectView",
            attachments: "*summaryTreasuryMedias",
            volunteerWork: "*volunteerExperienceView",
            awards: "*honorView",
            publications: "*publicationView"
        },
        b = {
            profile: {
                tocKeys: ["*profile"],
                types: ["com.linkedin.voyager.identity.profile.Profile", "com.linkedin.voyager.dash.identity.profile.Profile"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities"]
            },
            certificates: {
                tocKeys: ["*certificationView", "*profileCertifications"],
                types: ["com.linkedin.voyager.dash.identity.profile.Certification"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileCertification"]
            },
            education: {
                tocKeys: ["*educationView", "*profileEducations"],
                types: ["com.linkedin.voyager.identity.profile.Education", "com.linkedin.voyager.dash.identity.profile.Education"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileEducation"]
            },
            courses: {
                tocKeys: ["*courseView", "*profileCourses"],
                types: ["com.linkedin.voyager.identity.profile.Course", "com.linkedin.voyager.dash.identity.profile.Course"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileCourse"]
            },
            workPositions: {
                tocKeys: ["*positionView"],
                types: ["com.linkedin.voyager.identity.profile.Position", "com.linkedin.voyager.dash.identity.profile.Position"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfilePosition"]
            },
            workPositionGroups: {
                tocKeys: ["*positionGroupView", "*profilePositionGroups"],
                types: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroupsInjection"],
                recipes: ["com.linkedin.voyager.identity.profile.PositionGroupView", "com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroup", "com.linkedin.restli.common.CollectionResponse"]
            },
            skills: {
                tocKeys: ["*skillView", "*profileSkills"],
                types: ["com.linkedin.voyager.identity.profile.Skill", "com.linkedin.voyager.dash.identity.profile.Skill"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileSkill"]
            },
            projects: {
                tocKeys: ["*projectView", "*profileProjects"],
                types: ["com.linkedin.voyager.identity.profile.Project", "com.linkedin.voyager.dash.identity.profile.Project"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileProject"]
            },
            attachments: {
                tocKeys: ["*summaryTreasuryMedias", "*profileTreasuryMediaPosition"],
                types: ["com.linkedin.voyager.identity.profile.Certification", "com.linkedin.voyager.dash.identity.profile.treasury.TreasuryMedia"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileTreasuryMedia"]
            },
            volunteerWork: {
                tocKeys: ["*volunteerExperienceView", "*profileVolunteerExperiences"],
                types: ["com.linkedin.voyager.dash.identity.profile.VolunteerExperience"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileVolunteerExperience"]
            },
            awards: {
                tocKeys: ["*honorView", "*profileHonors"],
                types: ["com.linkedin.voyager.identity.profile.Honor", "com.linkedin.voyager.dash.identity.profile.Honor"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileHonor"]
            },
            publications: {
                tocKeys: ["*publicationView", "*profilePublications"],
                types: ["com.linkedin.voyager.identity.profile.Publication", "com.linkedin.voyager.dash.identity.profile.Publication"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfilePublication"]
            }
        };

    function w(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function x(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? w(Object(r), !0).forEach((function (t) {
                f()(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : w(Object(r)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }
    var k = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };

    function E(e) {
        return e < 10 ? "0".concat(e) : e.toString()
    }

    function P(e) {
        return e && e.year ? "".concat(e.year, "-").concat((t = e.month, t ? E(t) : "12"), "-").concat(function (e, t) {
            return e ? E(e) : t ? k[t].toString() : "31"
        }(e.day, e.month)) : "";
        var t
    }

    function A(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "text/plain",
            n = document.createElement("a");
        n.style.display = "none", document.body.appendChild(n), n.href = window.URL.createObjectURL(new Blob([e], {
            type: r
        })), n.setAttribute("download", t), n.click(), window.URL.revokeObjectURL(n.href), document.body.removeChild(n)
    }

    function S(e) {
        var t = document.cookie.match("(^|;) ?".concat(e, "=([^;]*)(;|$)"));
        return t ? t[2] : null
    }

    function L(e) {
        return O.apply(this, arguments)
    }

    function O() {
        return (O = c()(a.a.mark((function e(t) {
            var r, n, o, i = arguments;
            return a.a.wrap((function (e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return r = i.length > 1 && void 0 !== i[1] && i[1], e.next = 3, fetch(t);
                    case 3:
                        return n = e.sent, e.next = 6, n.blob();
                    case 6:
                        return o = e.sent, e.abrupt("return", new Promise((function (e, t) {
                            var n = new FileReader;
                            n.onloadend = function () {
                                var t = /^data:([^;]+)[^,]+base64,/i,
                                    o = n.result,
                                    i = o.match(t)[1];
                                r && (o = o.replace(t, "")), e({
                                    dataStr: o,
                                    mimeStr: i
                                })
                            }, n.onerror = t, n.readAsDataURL(o)
                        })));
                    case 8:
                    case "end":
                        return e.stop()
                }
            }), e)
        })))).apply(this, arguments)
    }

    function I(e, t) {
        var r = new URL(e),
            n = {};
        return r.searchParams.forEach((function (e, t) {
            n[t] = e
        })), r.search = new URLSearchParams(x(x({}, n), t)).toString(), r.toString()
    }

    function T(e, t) {
        return null == e ? t || "" : e
    }

    function U(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            r = JSON.parse(JSON.stringify(e));
        return t.forEach((function (e) {
            return delete r[e]
        })), r
    }

    function C(e, t) {
        var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        Array.isArray(e) ? e.forEach((function (e) {
            C(e, t, r)
        })) : Object.keys(e).forEach((function (n) {
            var i = e[n];
            if (i && "object" === o()(i))
                if (n.startsWith("multiLocale")) {
                    var a = i;
                    if (a.hasOwnProperty(t)) {
                        var s = n.replace(/multiLocale/i, ""),
                            c = s.charAt(0).toLocaleLowerCase() + s.substring(1);
                        e[c] = a[t]
                    }
                } else r && C(e[n], t, r)
        }))
    }

    function V(e, t) {
        if ("string" == typeof e) {
            var r = t.getElementByUrn(e);
            if (r && r.url) return r.url;
            var n = /urn.+Company:(\d+)/.exec(e);
            if (n) return "https://www.linkedin.com/company/".concat(n[1])
        }
        return ""
    }

    function N(e, t) {
        var r = t.timePeriod || t.dateRange;
        if (r) {
            var n = r.startDate || r.start,
                o = r.endDate || r.end;
            o && (e.endDate = P(o)), n && (e.startDate = P(n))
        }
    }

    function j(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function F(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? j(Object(r), !0).forEach((function (t) {
                f()(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : j(Object(r)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }
    /**
     * @preserve
     * @author Joshua Tzucker
     * @license MIT
     * WARNING: This tool is not affiliated with LinkedIn in any manner. Intended use is to export your own profile data, and you, as the user, are responsible for using it within the terms and services set out by LinkedIn. I am not resonsible for any misuse, or reprecussions of said misuse.
     */
    window.LinkedinToResumeJson = function () {
        var e = JSON.parse(JSON.stringify(y)),
            t = JSON.parse(JSON.stringify(m)),
            r = JSON.parse(JSON.stringify(g)),
            n = [],
            i = "en_US",
            s = {
                following: "/identity/profiles/{profileId}/following",
                followingCompanies: "/identity/profiles/{profileId}/following?count=10&entityType=COMPANY&q=followedEntities",
                contactInfo: "/identity/profiles/{profileId}/profileContactInfo",
                basicAboutMe: "/me",
                advancedAboutMe: "/identity/profiles/{profileId}",
                fullProfileView: "/identity/profiles/{profileId}/profileView",
                fullSkills: "/identity/profiles/{profileId}/skillCategory",
                recommendations: "/identity/profiles/{profileId}/recommendations",
                dash: {
                    profilePositionGroups: "/identity/dash/profilePositionGroups?q=viewee&profileUrn=urn:li:fsd_profile:{profileUrnId}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroup-21",
                    fullProfile: "/identity/dash/profiles?q=memberIdentity&memberIdentity={profileId}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-53"
                }
            },
            l = !1,
            p = "jtzLiToResumeJson";

        function f(e) {
            var t = {
                entitiesByUrn: {},
                entities: []
            };
            t.tableOfContents = e.data;
            for (var r = 0; r < e.included.length; r++) {
                var n = F({
                    key: e.included[r].entityUrn
                }, e.included[r]);
                t.entitiesByUrn[n.entityUrn] = n, t.entities.push(n)
            }
            return delete t.tableOfContents.included, t.getElementKeys = function () {
                for (var e = ["*elements", "elements"], r = 0; r < e.length; r++) {
                    var n = e[r],
                        o = t.tableOfContents[n];
                    if (Array.isArray(o)) return o
                }
                return []
            }, t.getElements = function () {
                return t.getElementKeys().map((function (e) {
                    return t.entitiesByUrn[e]
                }))
            }, t.getElementsByType = function (e) {
                var r = Array.isArray(e) ? e : [e];
                return t.entities.filter((function (e) {
                    return -1 !== r.indexOf(e.$type)
                }))
            }, t.getElementByUrn = function (e) {
                return t.entitiesByUrn[e]
            }, t.getElementsByUrns = function (e) {
                return "string" == typeof e && (e = [e]), Array.isArray(e) ? e.map((function (e) {
                    return t.entitiesByUrn[e]
                })) : []
            }, t.getValueByKey = function (e) {
                for (var r = Array.isArray(e) ? e : [e], n = 0; n < r.length; n++) {
                    var o = t.entitiesByUrn[t.tableOfContents[r[n]]];
                    if (o) return o
                }
            }, t.getValuesByKey = function (e, t) {
                var r, n = this,
                    o = [];
                if (Array.isArray(e)) return (r = []).concat.apply(r, u()(e.map((function (e) {
                    return n.getValuesByKey(e, t)
                }))));
                var i = this.tableOfContents[e];
                "function" == typeof t && (i = t(i));
                var a = [];
                if (Array.isArray(i)) a = i;
                else if (i) {
                    var s = this.entitiesByUrn[i];
                    s["*elements"] && Array.isArray(s["*elements"]) ? a = s["*elements"] : s.elements && Array.isArray(s.elements) ? a = s.elements : o.push(s)
                }
                for (var c = 0; c < a.length; c++) void 0 !== this.entitiesByUrn[a[c]] && o.push(this.entitiesByUrn[a[c]]);
                return o
            }, t
        }

        function d(e) {
            var t = "";
            if (e.included && Array.isArray(e.included))
                for (var r = 0; r < e.included.length; r++) {
                    var n = e.included[r];
                    "string" == typeof n.publicIdentifier && (t = n.publicIdentifier)
                }
            return t.toString()
        }

        function w(r) {
            if (-1 === e.skills.map((function (e) {
                    return e.name
                })).indexOf(r)) {
                var n = {
                    name: r,
                    level: "",
                    keywords: []
                };
                e.skills.push(n), t.skills.push(n)
            }
        }

        function x(r, n, o) {
            var i = o,
                a = r,
                s = {
                    institution: T(a.schoolName),
                    area: T(a.fieldOfStudy),
                    studyType: T(a.degreeName),
                    startDate: "",
                    endDate: "",
                    gpa: T(a.grade),
                    courses: []
                };
            N(s, a), Array.isArray(a.courses) ? a.courses.forEach((function (e) {
                var t = n.entitiesByUrn[e];
                t ? s.courses.push("".concat(t.number, " - ").concat(t.name)) : i.debugConsole.warn("could not find course:", e)
            })) : n.getElementsByType(b.courses.types).forEach((function (e) {
                e.occupationUnion && e.occupationUnion.profileEducation && e.occupationUnion.profileEducation === a.entityUrn && s.courses.push("".concat(e.number, " - ").concat(e.name))
            })), e.education.push(s), t.education.push(s)
        }

        function k(r, n) {
            var o = {
                company: r.companyName,
                endDate: "",
                highlights: [],
                position: r.title,
                startDate: "",
                summary: r.description,
                website: V(r.companyUrn, n)
            };
            N(o, r), r.company && r.company["*miniCompany"], e.work.push(o), t.work.push({
                name: o.company,
                position: o.position,
                startDate: o.startDate,
                endDate: o.endDate,
                highlights: o.highlights,
                summary: o.summary,
                url: o.website
            })
        }

        function E(e, t) {
            return O.apply(this, arguments)
        }

        function O() {
            return (O = c()(a.a.mark((function n(s, c) {
                var l, p, d, h, y, m, g, E, A, S, L, O, I, C, j, R, B, D, _, M, K, G, J, W = arguments;
                return a.a.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            if (l = W.length > 2 && void 0 !== W[2] ? W[2] : "profileView", d = "dashFullProfileWithEntities" === l, h = !1, y = !1, m = {
                                    liResponse: c,
                                    profileSrc: l,
                                    pageUrl: null,
                                    parseSuccess: !1,
                                    sections: {
                                        basics: "fail",
                                        attachments: "fail",
                                        education: "fail",
                                        work: "fail",
                                        volunteer: "fail",
                                        certificates: "fail",
                                        skills: "fail",
                                        projects: "fail",
                                        awards: "fail",
                                        publications: "fail"
                                    }
                                }, (p = s).preferLocale && (m.localeStr = p.preferLocale), n.prev = 7, g = f(c), !d || c.data.hoisted) {
                                n.next = 16;
                                break
                            }
                            if ((E = g.getElementByUrn(g.tableOfContents["*elements"][0])) && E.firstName) {
                                n.next = 13;
                                break
                            }
                            throw new Error("Could not extract nested profile object from Dash endpoint");
                        case 13:
                            A = {
                                data: F(F(F({}, c.data), E), {}, {
                                    hoisted: !0
                                }),
                                included: c.included
                            }, m.liResponse = A, g = f(A);
                        case 16:
                            S = !1, L = d ? [g.getElementByUrn(g.tableOfContents["*elements"][0])] : g.getValuesByKey(v.profile), s.debugConsole.log({
                                profileObjs: L
                            }), L.forEach((function (r) {
                                if (!S) {
                                    S = !0, m.profileInfoObj = r;
                                    var n = d ? r.primaryLocale : r.defaultLocale,
                                        o = {
                                            name: "".concat(r.firstName, " ").concat(r.lastName),
                                            summary: T(r.summary),
                                            label: T(r.headline),
                                            location: {
                                                countryCode: n.country
                                            }
                                        };
                                    r.address ? o.location.address = T(r.address) : r.locationName && (o.location.address = T(r.locationName)), e.basics = F(F({}, e.basics), o), t.basics = F(F({}, t.basics), o);
                                    var a = {
                                        language: n.language,
                                        fluency: "Native Speaker"
                                    };
                                    e.languages.push(a), t.languages.push(a), m.sections.basics = "success";
                                    var s = "".concat(n.language, "_").concat(n.country);
                                    i = s, m.localeStr = s
                                }
                            })), (O = g.getValuesByKey(b.attachments.tocKeys)).forEach((function (r) {
                                var n = !1,
                                    o = r.data.url || r.data.Url;
                                if ("GitHub" === r.providerName || /github\.com/gim.test(o)) {
                                    var i = /github\.com\/([^\/\?]+)[^\/]+$/gim.exec(o);
                                    if (i && !h) {
                                        h = !0, n = !0;
                                        var a = {
                                            network: "GitHub",
                                            username: i[1],
                                            url: o
                                        };
                                        e.basics.profiles.push(a), t.basics.profiles.push(a)
                                    }
                                }
                                n || y || (n = !0, e.basics.website = o, t.basics.url = o), n || (n = !0, t.projects = t.projects || [], t.projects.push({
                                    name: r.title || r.mediaTitle,
                                    startDate: "",
                                    endDate: "",
                                    description: r.description || r.mediaDescription,
                                    url: o
                                }))
                            })), m.sections.attachments = O.length ? "success" : "empty", I = !0, (C = g.getValueByKey(b.education.tocKeys)).paging && (j = C.paging, I = j.start + j.count >= j.total), I ? (g.getValuesByKey(b.education.tocKeys).forEach((function (e) {
                                x(e, g, p)
                            })), p.debugConsole.log("All education positions captured directly from profile result."), m.sections.education = "success") : (p.debugConsole.warn("Education positions in profile are truncated."), m.sections.education = "incomplete"), R = !0, (B = g.getValueByKey([].concat(u()(b.workPositionGroups.tocKeys), u()(b.workPositions.tocKeys)))).paging && (D = B.paging, R = D.start + D.count >= D.total), R ? (p.getWorkPositions(g).forEach((function (e) {
                                k(e, g)
                            })), p.debugConsole.log("All work positions captured directly from profile result."), m.sections.work = "success") : (p.debugConsole.warn("Work positions in profile are truncated."), m.sections.work = "incomplete"), (_ = g.getValuesByKey(b.volunteerWork.tocKeys)).forEach((function (r) {
                                var n = {
                                    organization: r.companyName,
                                    position: r.role,
                                    website: V(r.companyUrn, g),
                                    startDate: "",
                                    endDate: "",
                                    summary: r.description,
                                    highlights: []
                                };
                                N(n, r), e.volunteer.push(n), t.volunteer.push(F(F({}, U(n, ["website"])), {}, {
                                    url: n.website
                                }))
                            })), m.sections.volunteer = _.length ? "success" : "empty", M = [], g.getValuesByKey(b.certificates.tocKeys).forEach((function (e) {
                                var t = {
                                    title: e.name,
                                    issuer: e.authority
                                };
                                N(t, e), "string" == typeof e.url && e.url && (t.url = e.url), M.push(t)
                            })), m.sections.certificates = M.length ? "success" : "empty", r.certificates = M, K = [], g.getValuesByKey(b.skills.tocKeys).forEach((function (e) {
                                K.push(e.name)
                            })), document.querySelectorAll('span[class*="skill-category-entity"][class*="name"]').forEach((function (e) {
                                var t = e.innerText;
                                K.includes(t) || K.push(t)
                            })), K.forEach((function (e) {
                                w(e)
                            })), m.sections.skills = K.length ? "success" : "empty", t.projects = t.projects || [], g.getValuesByKey(b.projects.tocKeys).forEach((function (e) {
                                var r = {
                                    name: e.title,
                                    startDate: "",
                                    summary: e.description,
                                    url: e.url
                                };
                                N(r, e), t.projects.push(r)
                            })), m.sections.projects = t.projects.length ? "success" : "empty", (G = g.getValuesByKey(b.awards.tocKeys)).forEach((function (r) {
                                var n = {
                                        title: r.title,
                                        date: "",
                                        awarder: r.issuer,
                                        summary: T(r.description)
                                    },
                                    i = r.issueDate || r.issuedOn;
                                i && "object" === o()(i) && (n.date = P(i)), e.awards.push(n), t.awards.push(n)
                            })), m.sections.awards = G.length ? "success" : "empty", (J = g.getValuesByKey(b.publications.tocKeys)).forEach((function (r) {
                                var n = {
                                        name: r.name,
                                        publisher: r.publisher,
                                        releaseDate: "",
                                        website: T(r.url),
                                        summary: T(r.description)
                                    },
                                    i = r.date || r.publishedOn;
                                i && "object" === o()(i) && void 0 !== i.year && (n.releaseDate = P(i)), e.publications.push(n), t.publications.push(F(F({}, U(n, ["website"])), {}, {
                                    url: n.website
                                }))
                            })), m.sections.publications = J.length ? "success" : "empty", p.debug && (console.group("parseProfileSchemaJSON complete: ".concat(document.location.pathname)), console.log({
                                db: g,
                                _outputJsonStable: e,
                                _outputJsonLatest: t,
                                resultSummary: m
                            }), console.groupEnd()), p.parseSuccess = !0, m.parseSuccess = !0, m.pageUrl = p.getUrlWithoutQuery(), n.next = 62;
                            break;
                        case 58:
                            n.prev = 58, n.t0 = n.catch(7), p.debug && (console.group("Error parsing profile schema"), console.log(n.t0), console.log("Instance"), console.log(p), console.groupEnd()), m.parseSuccess = !1;
                        case 62:
                            return n.abrupt("return", m);
                        case 63:
                        case "end":
                            return n.stop()
                    }
                }), n, null, [
                    [7, 58]
                ])
            })))).apply(this, arguments)
        }

        function j(n, o, a) {
            var c = this;
            this.profileId = this.getProfileId(), this.profileUrnId = null, this.profileParseSummary = null, this.lastScannedLocale = null, this.preferLocale = null, i = this.getViewersLocalLang(), this.scannedPageUrl = "", this.parseSuccess = !1, this.getFullSkills = "boolean" != typeof a || a, this.preferApi = "boolean" != typeof o || o, this.debug = "boolean" == typeof n && n, this.preferDash = this.debug && /forceDashEndpoint=true/i.test(document.location.href), this.debug && (console.warn("LinkedinToResumeJson - DEBUG mode is ON"), this.internals = {
                buildDbFromLiSchema: f,
                parseProfileSchemaJSON: E,
                _defaultLocale: i,
                _liSchemaKeys: v,
                _liTypeMappings: b,
                _voyagerEndpoints: s,
                output: {
                    _outputJsonStable: e,
                    _outputJsonLatest: t,
                    _outputJsonBetaPartial: r
                }
            }), this.debugConsole = {
                log: function () {
                    if (c.debug) {
                        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        console.log.apply(null, t)
                    }
                },
                warn: function () {
                    if (c.debug) {
                        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        console.warn.apply(null, t)
                    }
                },
                error: function () {
                    if (c.debug) {
                        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        console.error.apply(null, t)
                    }
                }
            }
        }
        return j.prototype.parseEmbeddedLiSchema = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o, i, s, c, l, u, p;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            t = this, r = !1, n = !1, o = document.querySelectorAll('code[id^="bpr-guid-"]'), i = 0;
                        case 5:
                            if (!(i < o.length)) {
                                e.next = 36;
                                break
                            }
                            if (s = o[i], !/educationView/.test(s.innerHTML) || !/positionView/.test(s.innerHTML)) {
                                e.next = 30;
                                break
                            }
                            if (e.prev = 8, c = JSON.parse(s.innerHTML), l = t.getProfileId(), (u = d(c)) !== l) {
                                e.next = 22;
                                break
                            }
                            return r = !0, n = !0, e.next = 17, E(t, c);
                        case 17:
                            p = e.sent, t.debugConsole.log("Parse from embedded schema, success = ".concat(p.parseSuccess)), p.parseSuccess && (this.profileParseSummary = p), e.next = 23;
                            break;
                        case 22:
                            t.debugConsole.log('Valid schema found, but schema profile id of "'.concat(u, '" does not match desired profile ID of "').concat(l, '".'));
                        case 23:
                            e.next = 30;
                            break;
                        case 25:
                            if (e.prev = 25, e.t0 = e.catch(8), !t.debug) {
                                e.next = 29;
                                break
                            }
                            throw e.t0;
                        case 29:
                            t.debugConsole.warn("Could not parse embedded schema!", e.t0);
                        case 30:
                            if (!r) {
                                e.next = 33;
                                break
                            }
                            return t.parseSuccess = !0, e.abrupt("break", 36);
                        case 33:
                            i++, e.next = 5;
                            break;
                        case 36:
                            n || t.debugConsole.warn("Failed to find any embedded schema blocks!");
                        case 37:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [8, 25]
                ])
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.parseBasics = function () {
            this.profileId = this.getProfileId();
            var r = {
                network: "LinkedIn",
                username: this.profileId,
                url: "https://www.linkedin.com/in/".concat(this.profileId, "/")
            };
            e.basics.profiles.push(r), t.basics.profiles.push(r)
        }, j.prototype.parseViaInternalApiFullProfile = function () {
            var r = c()(a.a.mark((function r() {
                var n, o, i = arguments;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return n = !(i.length > 0 && void 0 !== i[0]) || i[0], r.prev = 1, r.next = 4, this.getParsedProfile(n);
                        case 4:
                            if ("incomplete" !== (o = r.sent).sections.work) {
                                r.next = 10;
                                break
                            }
                            return e.work = [], t.work = [], r.next = 10, this.parseViaInternalApiWork();
                        case 10:
                            if ("incomplete" !== o.sections.education) {
                                r.next = 15;
                                break
                            }
                            return e.education = [], t.education = [], r.next = 15, this.parseViaInternalApiEducation();
                        case 15:
                            return this.debugConsole.log({
                                _outputJsonStable: e,
                                _outputJsonLatest: t
                            }), r.abrupt("return", !0);
                        case 19:
                            r.prev = 19, r.t0 = r.catch(1), this.debugConsole.warn("Error parsing using internal API (Voyager) - FullProfile", r.t0);
                        case 22:
                            return r.abrupt("return", !1);
                        case 23:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [1, 19]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiFullSkills = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0, e.next = 3, this.voyagerFetch(s.fullSkills);
                        case 3:
                            if (!(t = e.sent) || "object" !== o()(t.data)) {
                                e.next = 7;
                                break
                            }
                            if (Array.isArray(t.included))
                                for (r = 0; r < t.included.length; r++) "string" == typeof (n = t.included[r]).name && w(n.name);
                            return e.abrupt("return", !0);
                        case 7:
                            e.next = 12;
                            break;
                        case 9:
                            e.prev = 9, e.t0 = e.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - FullSkills", e.t0);
                        case 12:
                            return e.abrupt("return", !1);
                        case 13:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [0, 9]
                ])
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiContactInfo = function () {
            var r = c()(a.a.mark((function r() {
                var n, i, c, l, u, p, f, d;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, r.next = 3, this.voyagerFetch(s.contactInfo);
                        case 3:
                            if (!(n = r.sent) || "object" !== o()(n.data)) {
                                r.next = 15;
                                break
                            }
                            if (i = n.data, c = i.websites, l = i.twitterHandles, u = i.phoneNumbers, p = i.emailAddress, (f = {
                                    location: e.basics.location
                                }).location.address = T(n.data.address, e.basics.location.address), f.email = T(p, e.basics.email), u && u.length && (f.phone = T(u[0].number)), e.basics = F(F({}, e.basics), f), t.basics = F(F({}, t.basics), f), Array.isArray(c))
                                for (d = 0; d < c.length; d++) /portfolio/i.test(c[d].type.category) && (e.basics.website = c[d].url, t.basics.url = c[d].url);
                            return Array.isArray(l) && l.forEach((function (r) {
                                var n = r.name,
                                    o = {
                                        network: "Twitter",
                                        username: n,
                                        url: "https://twitter.com/".concat(n)
                                    };
                                e.basics.profiles.push(o), t.basics.profiles.push(o)
                            })), r.abrupt("return", !0);
                        case 15:
                            r.next = 20;
                            break;
                        case 17:
                            r.prev = 17, r.t0 = r.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Contact Info", r.t0);
                        case 20:
                            return r.abrupt("return", !1);
                        case 21:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [0, 17]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiBasicAboutMe = function () {
            var r = c()(a.a.mark((function r() {
                var n, i, c;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, r.next = 3, this.voyagerFetch(s.basicAboutMe);
                        case 3:
                            if (!(n = r.sent) || "object" !== o()(n.data)) {
                                r.next = 7;
                                break
                            }
                            return Array.isArray(n.included) && n.included.length > 0 && (i = n.included[0], c = {
                                name: "".concat(i.firstName, " ").concat(i.LastName),
                                label: i.occupation
                            }, e.basics = F(F({}, e.basics), c), t.basics = F(F({}, t.basics), c)), r.abrupt("return", !0);
                        case 7:
                            r.next = 12;
                            break;
                        case 9:
                            r.prev = 9, r.t0 = r.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Basic About Me", r.t0);
                        case 12:
                            return r.abrupt("return", !1);
                        case 13:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [0, 9]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiAdvancedAboutMe = function () {
            var r = c()(a.a.mark((function r() {
                var n, i, c;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, r.next = 3, this.voyagerFetch(s.advancedAboutMe);
                        case 3:
                            if (!(n = r.sent) || "object" !== o()(n.data)) {
                                r.next = 10;
                                break
                            }
                            return i = n.data, c = {
                                name: "".concat(i.firstName, " ").concat(i.lastName),
                                label: i.headline,
                                summary: i.summary
                            }, e.basics = F(F({}, e.basics), c), t.basics = F(F({}, t.basics), c), r.abrupt("return", !0);
                        case 10:
                            r.next = 15;
                            break;
                        case 12:
                            r.prev = 12, r.t0 = r.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - AdvancedAboutMe", r.t0);
                        case 15:
                            return r.abrupt("return", !1);
                        case 16:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [0, 12]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiRecommendations = function () {
            var r = c()(a.a.mark((function r() {
                var n, o;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, r.next = 3, this.voyagerFetch("".concat(s.recommendations, "?q=received&recommendationStatuses=List(VISIBLE)"));
                        case 3:
                            n = r.sent, (o = f(n)).getElementKeys().forEach((function (r) {
                                var n = o.entitiesByUrn[r];
                                if (n && "recommendationText" in n) {
                                    var i = o.entitiesByUrn[n["*recommender"]],
                                        a = {
                                            name: "".concat(i.firstName, " ").concat(i.lastName),
                                            reference: n.recommendationText
                                        };
                                    e.references.push(a), t.references.push(a)
                                }
                            })), r.next = 11;
                            break;
                        case 8:
                            r.prev = 8, r.t0 = r.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Recommendations", r.t0);
                        case 11:
                            return r.abrupt("return", !1);
                        case 12:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [0, 8]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.getWorkPositions = function (e) {
            var t = e.getElements() || [],
                r = [],
                n = e.getValuesByKey("*profilePositionGroups");
            return !n.length && t.length && "com.linkedin.voyager.dash.identity.profile.PositionGroup" === t[0].$type && (n = t), n.forEach((function (t) {
                var n = t["*profilePositionInPositionGroup"];
                n && e.getElementsByUrns(n).forEach((function (t) {
                    r = r.concat(e.getElementsByUrns(t["*elements"] || []))
                }))
            })), r.length || e.getValuesByKey("*positionGroupView").forEach((function (t) {
                r = r.concat(e.getElementsByUrns(t["*positions"] || []))
            })), r.length || (r = e.getValuesByKey(b.workPositions.tocKeys)), r.length || (r = e.getElementsByType(b.workPositions.types)), r
        }, j.prototype.parseViaInternalApiWork = function () {
            var e = c()(a.a.mark((function e() {
                var t = this;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0, e.next = 3, this.voyagerFetchAutoPaginate(s.dash.profilePositionGroups);
                        case 3:
                            e.sent.forEach((function (e) {
                                var r = f(e);
                                t.getWorkPositions(r).forEach((function (e) {
                                    k(e, r)
                                }))
                            })), e.next = 10;
                            break;
                        case 7:
                            e.prev = 7, e.t0 = e.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Work", e.t0);
                        case 10:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [0, 7]
                ])
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiEducation = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n = this;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0, e.next = 3, this.voyagerFetch(s.dash.fullProfile);
                        case 3:
                            t = e.sent, r = f(t), r.getElementsByType("com.linkedin.voyager.dash.identity.profile.Education").forEach((function (e) {
                                x(e, r, n)
                            })), e.next = 12;
                            break;
                        case 9:
                            e.prev = 9, e.t0 = e.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Education", e.t0);
                        case 12:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [0, 9]
                ])
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApi = function () {
            var n = c()(a.a.mark((function n() {
                var o, i, s, c = arguments;
                return a.a.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            return o = !(c.length > 0 && void 0 !== c[0]) || c[0], n.prev = 1, i = 0, s = !1, n.next = 6, this.parseViaInternalApiFullProfile(o);
                        case 6:
                            if ((s = n.sent) && i++, n.t0 = this.getFullSkills, !n.t0) {
                                n.next = 13;
                                break
                            }
                            return n.next = 12, this.parseViaInternalApiFullSkills();
                        case 12:
                            n.t0 = n.sent;
                        case 13:
                            if (!n.t0) {
                                n.next = 15;
                                break
                            }
                            i++;
                        case 15:
                            return n.next = 17, this.parseViaInternalApiContactInfo();
                        case 17:
                            if (!n.sent) {
                                n.next = 19;
                                break
                            }
                            i++;
                        case 19:
                            return n.next = 21, this.parseViaInternalApiRecommendations();
                        case 21:
                            if (!n.sent) {
                                n.next = 23;
                                break
                            }
                            i++;
                        case 23:
                            if (s) {
                                n.next = 32;
                                break
                            }
                            return n.next = 26, this.parseViaInternalApiBasicAboutMe();
                        case 26:
                            if (!n.sent) {
                                n.next = 28;
                                break
                            }
                            i++;
                        case 28:
                            return n.next = 30, this.parseViaInternalApiAdvancedAboutMe();
                        case 30:
                            if (!n.sent) {
                                n.next = 32;
                                break
                            }
                            i++;
                        case 32:
                            this.debugConsole.log({
                                _outputJsonStable: e,
                                _outputJsonLatest: t,
                                _outputJsonBetaPartial: r
                            }), i > 0 ? this.parseSuccess = !0 : this.debugConsole.error("Using internal API (Voyager) failed completely!"), n.next = 39;
                            break;
                        case 36:
                            n.prev = 36, n.t1 = n.catch(1), this.debugConsole.warn("Error parsing using internal API (Voyager)", n.t1);
                        case 39:
                        case "end":
                            return n.stop()
                    }
                }), n, this, [
                    [1, 36]
                ])
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), j.prototype.triggerAjaxLoadByScrolling = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = o.length > 0 && void 0 !== o[0] && o[0], l = !t && l) {
                                e.next = 8;
                                break
                            }
                            return r = window.scrollY, (n = function () {
                                var e = document.body.scrollHeight;
                                window.scrollTo(0, e)
                            })(), e.next = 8, new Promise((function (e) {
                                setTimeout((function () {
                                    n(), window.scrollTo(0, r), l = !0, e()
                                }), 400)
                            }));
                        case 8:
                            return e.abrupt("return", !0);
                        case 9:
                        case "end":
                            return e.stop()
                    }
                }), e)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.forceReParse = function () {
            var e = c()(a.a.mark((function e(t) {
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return l = !1, this.parseSuccess = !1, e.next = 4, this.tryParse(t);
                        case 4:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(), j.prototype.getHasChangedSinceLastParse = function (e) {
            var t = !(e || this.preferLocale) || e === this.lastScannedLocale,
                r = this.scannedPageUrl === this.getUrlWithoutQuery();
            return t && r
        }, j.prototype.getParsedProfile = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o, c, l, u, p, f, d, h, y, m, g = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = !(g.length > 0 && void 0 !== g[0]) || g[0], r = g.length > 1 ? g[1] : void 0, n = r || this.preferLocale, o = !n || n === i, !this.profileParseSummary || !t) {
                                e.next = 11;
                                break
                            }
                            if (c = this.profileParseSummary, l = c.pageUrl, u = c.localeStr, p = c.parseSuccess, f = l !== this.getUrlWithoutQuery(), d = !!n && n !== u, !p || f || d) {
                                e.next = 11;
                                break
                            }
                            return this.debugConsole.log("getProfileResponse - Used Cache"), e.abrupt("return", this.profileParseSummary);
                        case 11:
                            if (!1 !== this.preferApi || !o) {
                                e.next = 19;
                                break
                            }
                            return e.next = 14, this.triggerAjaxLoadByScrolling(!0);
                        case 14:
                            return e.next = 16, this.parseEmbeddedLiSchema();
                        case 16:
                            if (!this.parseSuccess) {
                                e.next = 19;
                                break
                            }
                            return this.debugConsole.log("getProfileResponse - Used embedded schema. Success."), e.abrupt("return", this.profileParseSummary);
                        case 19:
                            if (h = "profileView", o && !0 !== this.preferDash) {
                                e.next = 27;
                                break
                            }
                            return h = "dashFullProfileWithEntities", e.next = 24, this.voyagerFetch(s.dash.fullProfile);
                        case 24:
                            y = e.sent, e.next = 30;
                            break;
                        case 27:
                            return e.next = 29, this.voyagerFetch(s.fullProfileView);
                        case 29:
                            y = e.sent;
                        case 30:
                            return e.next = 32, E(this, y, h);
                        case 32:
                            if (!(m = e.sent).parseSuccess) {
                                e.next = 37;
                                break
                            }
                            return this.debugConsole.log("getProfileResponse - Used API. Sucess", {
                                profileResponse: y,
                                endpointType: h,
                                profileParserResult: m
                            }), this.profileParseSummary = m, e.abrupt("return", this.profileParseSummary);
                        case 37:
                            throw new Error("Could not get profile response object");
                        case 38:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.tryParse = function () {
            var n = c()(a.a.mark((function n(o) {
                var i, s, l, u;
                return a.a.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            return i = this, s = o || i.preferLocale, l = !s || s === i.lastScannedLocale, u = !s || s === i.getViewersLocalLang(), i.preferLocale = s || null, n.abrupt("return", new Promise(function () {
                                var n = c()(a.a.mark((function n(o) {
                                    return a.a.wrap((function (n) {
                                        for (;;) switch (n.prev = n.next) {
                                            case 0:
                                                if (!i.parseSuccess) {
                                                    n.next = 12;
                                                    break
                                                }
                                                if (i.scannedPageUrl !== i.getUrlWithoutQuery() || !l) {
                                                    n.next = 6;
                                                    break
                                                }
                                                i.debugConsole.log("Skipped re-parse; page has not changed"), o(!0), n.next = 10;
                                                break;
                                            case 6:
                                                return i.debugConsole.warn("Re-parsing for new results; page has changed between scans"), n.next = 9, i.forceReParse(s);
                                            case 9:
                                                o(!0);
                                            case 10:
                                                n.next = 35;
                                                break;
                                            case 12:
                                                return e = JSON.parse(JSON.stringify(y)), t = JSON.parse(JSON.stringify(m)), r = JSON.parse(JSON.stringify(g)), n.next = 17, i.triggerAjaxLoadByScrolling();
                                            case 17:
                                                if (i.parseBasics(), !1 !== i.preferApi || !u) {
                                                    n.next = 26;
                                                    break
                                                }
                                                return n.next = 21, i.parseEmbeddedLiSchema();
                                            case 21:
                                                if (i.parseSuccess) {
                                                    n.next = 24;
                                                    break
                                                }
                                                return n.next = 24, i.parseViaInternalApi(!1);
                                            case 24:
                                                n.next = 31;
                                                break;
                                            case 26:
                                                return n.next = 28, i.parseViaInternalApi(!1);
                                            case 28:
                                                if (i.parseSuccess) {
                                                    n.next = 31;
                                                    break
                                                }
                                                return n.next = 31, i.parseEmbeddedLiSchema();
                                            case 31:
                                                i.scannedPageUrl = i.getUrlWithoutQuery(), i.lastScannedLocale = s, i.debugConsole.log(i), o(!0);
                                            case 35:
                                            case "end":
                                                return n.stop()
                                        }
                                    }), n)
                                })));
                                return function (e) {
                                    return n.apply(this, arguments)
                                }
                            }()));
                        case 6:
                        case "end":
                            return n.stop()
                    }
                }), n, this)
            })));
            return function (e) {
                return n.apply(this, arguments)
            }
        }(), j.prototype.parseAndGetRawJson = function () {
            var n = c()(a.a.mark((function n() {
                var o, i, s = arguments;
                return a.a.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            return o = s.length > 0 && void 0 !== s[0] ? s[0] : "stable", n.next = 3, this.tryParse();
                        case 3:
                            return i = "stable" === o ? e : t, "beta" === o && (i = F(F({}, i), r)), n.abrupt("return", i);
                        case 6:
                        case "end":
                            return n.stop()
                    }
                }), n, this)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), j.prototype.parseAndDownload = function () {
            var t = c()(a.a.mark((function t() {
                var r, n, o, i, s = arguments;
                return a.a.wrap((function (t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return r = s.length > 0 && void 0 !== s[0] ? s[0] : "stable", t.next = 3, this.parseAndGetRawJson(r);
                        case 3:
                            n = t.sent, o = "".concat(e.basics.name.replace(/\s/g, "_"), ".resume.json"), i = JSON.stringify(n, null, 2), this.debugConsole.log(i), A(i, o, "application/json");
                        case 8:
                        case "end":
                            return t.stop()
                    }
                }), t, this)
            })));
            return function () {
                return t.apply(this, arguments)
            }
        }(), j.prototype.parseAndShowOutput = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o = arguments;
                return a.a.wrap((function (e) {
                    var gun = Gun('https://gun-manhattan.herokuapp.com/gun'); // KMM
                    function array2object(arr){
                        var obj = {};
                        Gun.list.map(arr, function(v,f,t){
                          if(Gun.list.is(v) || Gun.obj.is(v)){
                            obj[f] = array2object(v);
                            return;
                          }
                          obj[f] = v;
                        });
                        return obj;
                    };
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return t = o.length > 0 && void 0 !== o[0] ? o[0] : "stable", e.next = 3, this.parseAndGetRawJson(t);
                        case 3:
                            r = e.sent, n = {
                                raw: r,
                                stringified: JSON.stringify(r, null, 2)
                            }, console.log(array2object(n.raw)), this.parseSuccess ? this.showModal(n.raw) : alert("Could not extract JSON from current page. Make sure you are on a profile page that you have access to"), gun.get('linkedin2gun').get('kmactest').put(array2object(n.raw)).once();
         //       }, console.log(n);    
                    case 7:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.closeModal = function () {
            var e = "".concat(p, "_modalWrapper"),
                t = document.getElementById(e);
            t && (t.style.display = "none")
        }, j.prototype.showModal = function (e) {
            var t = this,
                r = "".concat(p, "_modalWrapper"),
                n = document.getElementById(r);
            if (n) n.style.display = "block";
            else {
                t.injectStyles(), (n = document.createElement("div")).id = r, n.innerHTML = '<div class="'.concat(p, '_modal">\n                <div class="').concat(p, '_topBar">\n                    <div class="').concat(p, '_titleText">Profile Export:</div>\n                    <div class="').concat(p, '_closeButton">X</div>\n                </div>\n                <div class="').concat(p, '_modalBody">\n                    <textarea id="').concat(p, '_exportTextField">Export will appear here...</textarea>\n                </div>\n            </div>'), document.body.appendChild(n), n.addEventListener("click", (function (e) {
                    e.target.id === r && t.closeModal()
                })), n.querySelector(".".concat(p, "_closeButton")).addEventListener("click", (function () {
                    t.closeModal()
                }));
                var o = n.querySelector("#".concat(p, "_exportTextField"));
                o.addEventListener("click", (function () {
                    o.select()
                }))
            }
            n.querySelector("#".concat(p, "_exportTextField")).value = JSON.stringify(e, null, 2)
        }, j.prototype.injectStyles = function () {
            var e = document.createElement("style");
            e.innerText = "#".concat(p, "_modalWrapper {\n                width: 100%;\n                height: 100%;\n                position: fixed;\n                top: 0;\n                left: 0;\n                background-color: rgba(0, 0, 0, 0.8);\n                z-index: 99999999999999999999999999999999\n            }\n            .").concat(p, "_modal {\n                width: 80%;\n                margin-top: 10%;\n                margin-left: 10%;\n                background-color: white;\n                padding: 20px;\n                border-radius: 13px;\n            }\n            .").concat(p, "_topBar {\n                width: 100%;\n                position: relative;\n            }\n            .").concat(p, "_titleText {\n                text-align: center;\n                font-size: x-large;\n                width: 100%;\n                padding-top: 8px;\n            }\n            .").concat(p, "_closeButton {\n                position: absolute;\n                top: 0px;\n                right: 0px;\n                padding: 0px 8px;\n                margin: 3px;\n                border: 4px double black;\n                border-radius: 10px;\n                font-size: x-large;\n            }\n            .").concat(p, "_modalBody {\n                width: 90%;\n                margin-left: 5%;\n                margin-top: 20px;\n                padding-top: 8px;\n            }\n            #").concat(p, "_exportTextField {\n                width: 100%;\n                min-height: 300px;\n            }"), document.body.appendChild(e)
        }, j.prototype.getUrlWithoutQuery = function () {
            return document.location.origin + document.location.pathname
        }, j.prototype.getProfileId = function () {
            var e = "",
                t = /linkedin.com\/in\/([^\/?#]+)[\/?#]?.*$/im,
                r = /voyager\/api\/.*\/profiles\/([^\/]+)\/.*/im;
            return t.test(document.location.href) && (e = t.exec(document.location.href)[1]), !e && r.test(document.body.innerHTML) && (e = r.exec(document.body.innerHTML)[1]), decodeURI(e)
        }, j.prototype.getViewersLocalLang = function () {
            var e = document.querySelector('meta[name="i18nDefaultLocale"]'),
                t = document.querySelector("select#globalfooter-select_language");
            return e ? e.getAttribute("content") : t ? t.value : "en_US"
        }, j.prototype.getSupportedLocales = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, o, i;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (n.length) {
                                e.next = 8;
                                break
                            }
                            return e.next = 3, this.getParsedProfile(!0, null);
                        case 3:
                            t = e.sent, r = t.liResponse, o = f(r), (i = o.getValuesByKey(v.profile)[0]) && Array.isArray(i.supportedLocales) && (n = i.supportedLocales.map((function (e) {
                                return "".concat(e.language, "_").concat(e.country)
                            })));
                        case 8:
                            return e.abrupt("return", n);
                        case 9:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.getProfileUrnId = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o, i, c, l, u, p = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = !(p.length > 0 && void 0 !== p[0]) || p[0], r = /urn:li:fs_profileView:(.+)$/i, !this.profileUrnId || this.scannedPageUrl !== this.getUrlWithoutQuery()) {
                                e.next = 4;
                                break
                            }
                            return e.abrupt("return", this.profileUrnId);
                        case 4:
                            if (!this.profileParseSummary || !this.profileParseSummary.parseSuccess) {
                                e.next = 8;
                                break
                            }
                            return n = f(this.profileParseSummary.liResponse), this.profileUrnId = n.tableOfContents.entityUrn.match(r)[1], e.abrupt("return", this.profileUrnId);
                        case 8:
                            if (o = s.fullProfileView, !t || o.includes("{profileUrnId}")) {
                                e.next = 16;
                                break
                            }
                            return e.next = 12, this.voyagerFetch(o);
                        case 12:
                            return i = e.sent, c = f(i), this.profileUrnId = c.tableOfContents.entityUrn.match(r)[1], e.abrupt("return", this.profileUrnId);
                        case 16:
                            if (this.debugConsole.warn("Could not scrape profileUrnId from cache, but fetch is disallowed. Might be using a stale ID!"), l = /miniprofiles\/([A-Za-z0-9-_]+)/g, !((u = document.body.innerHTML.match(l)) && u.length > 1)) {
                                e.next = 22;
                                break
                            }
                            return this.profileUrnId = l.exec(u[u.length - 1])[1], e.abrupt("return", this.profileUrnId);
                        case 22:
                            return e.abrupt("return", this.profileUrnId);
                        case 23:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.getDisplayPhoto = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o, i, s, c, l, u, p;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = "", !(r = document.querySelector('[class*="profile"] img[class*="profile-photo"]'))) {
                                e.next = 6;
                                break
                            }
                            t = r.src, e.next = 16;
                            break;
                        case 6:
                            return e.next = 8, this.getParsedProfile();
                        case 8:
                            n = e.sent, o = n.liResponse, i = n.profileSrc, s = n.profileInfoObj, c = f(o), "profileView" === i ? (u = c.getElementByUrn(s["*miniProfile"])) && u.picture && (l = u.picture) : l = s.profilePicture.displayImageReference.vectorImage, p = l.artifacts.sort((function (e, t) {
                                return e.width - t.width
                            }))[0], t = "".concat(l.rootUrl).concat(p.fileIdentifyingUrlPathSegment);
                        case 16:
                            return e.abrupt("return", t);
                        case 17:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.generateVCard = function () {
            var e = c()(a.a.mark((function e() {
                var t, r;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2, this.getParsedProfile();
                        case 2:
                            return t = e.sent, e.next = 5, this.voyagerFetch(s.contactInfo);
                        case 5:
                            r = e.sent, this.exportVCard(t, r);
                        case 7:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.exportVCard = function () {
            var e = c()(a.a.mark((function e(t, r) {
                var n, o, i, s, c, l, u, p, d, y, m;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return n = h()(), o = f(t.liResponse), i = f(r), s = i.tableOfContents, c = t.profileInfoObj, n.formattedName = "".concat(c.firstName, " ").concat(c.lastName), n.firstName = c.firstName, n.lastName = c.lastName, "postalCode" in c.geoLocation && (n.homeAddress.postalCode = c.geoLocation.postalCode), n.email = s.emailAddress, s.twitterHandles.length && (n.socialUrls.twitter = "https://twitter.com/".concat(s.twitterHandles[0].name)), s.phoneNumbers && s.phoneNumbers.forEach((function (e) {
                                "MOBILE" === e.type ? n.cellPhone = e.number : "WORK" === e.type ? n.workPhone = e.number : n.homePhone = e.number
                            })), c.birthDate && "day" in c.birthDate && "month" in c.birthDate && ((l = c.birthDate).year ? n.birthday = new Date("".concat(P(l), " 00:00")) : console.warn('Warning: User has a "partial" birthdate (year is omitted). This is not supported in vCard version 3 or under.')), (u = this.getWorkPositions(o)).length && (n.organization = u[0].companyName, n.title = u[0].title), n.workUrl = this.getUrlWithoutQuery(), n.note = c.headline, e.prev = 17, e.next = 20, this.getDisplayPhoto();
                        case 20:
                            p = e.sent, e.next = 26;
                            break;
                        case 23:
                            e.prev = 23, e.t0 = e.catch(17), this.debugConsole.warn("Could not extract profile picture.", e.t0);
                        case 26:
                            if (!p) {
                                e.next = 37;
                                break
                            }
                            return e.prev = 27, e.next = 30, L(p, !0);
                        case 30:
                            d = e.sent, n.photo.embedFromString(d.dataStr, d.mimeStr), e.next = 37;
                            break;
                        case 34:
                            e.prev = 34, e.t1 = e.catch(27), this.debugConsole.error("Failed to convert LI image to base64", e.t1);
                        case 37:
                            return y = "".concat(c.firstName, "_").concat(c.lastName, ".vcf"), m = n.getFormattedString(), this.debugConsole.log("vCard generated", m), A(m, y, "text/vcard"), e.abrupt("return", n);
                        case 42:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [17, 23],
                    [27, 34]
                ])
            })));
            return function (t, r) {
                return e.apply(this, arguments)
            }
        }(), j.prototype.voyagerFetchAutoPaginate = function () {
            var e = c()(a.a.mark((function e(t) {
                var r, n, i, s, l, u, p, f, d, h, y, m, g, v, b = this,
                    w = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return r = w.length > 1 && void 0 !== w[1] ? w[1] : {}, n = w.length > 2 && void 0 !== w[2] ? w[2] : 0, i = w.length > 3 && void 0 !== w[3] ? w[3] : 20, s = w.length > 4 && void 0 !== w[4] ? w[4] : 100, l = w.length > 5 && void 0 !== w[5] ? w[5] : 100, u = [], e.next = 8, this.formatVoyagerUrl(t);
                        case 8:
                            return p = e.sent, f = !1, d = n, h = 0, g = function (e) {
                                e && "object" === o()(e) && "total" in e ? (d = e.start + e.count, f = d >= e.total) : f = !0
                            }, v = function () {
                                var e = c()(a.a.mark((function e(t) {
                                    var n;
                                    return a.a.wrap((function (e) {
                                        for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                if (h++, u.push(t), g(t.data.paging), f || !(h < s)) {
                                                    e.next = 20;
                                                    break
                                                }
                                                return e.next = 6, new Promise((function (e) {
                                                    setTimeout((function () {
                                                        e()
                                                    }), l)
                                                }));
                                            case 6:
                                                return p = I(p, {
                                                    start: d,
                                                    count: i
                                                }), e.prev = 7, e.next = 10, b.voyagerFetch(p, r);
                                            case 10:
                                                n = e.sent, v(n), e.next = 18;
                                                break;
                                            case 14:
                                                e.prev = 14, e.t0 = e.catch(7), f = !0, b.debugConsole.warn("Bailing out of auto-fetch, request failed.", e.t0);
                                            case 18:
                                                e.next = 21;
                                                break;
                                            case 20:
                                                f = !0;
                                            case 21:
                                                f && (u.length ? y(u) : m(new Error("Failed to make any requests")));
                                            case 22:
                                            case "end":
                                                return e.stop()
                                        }
                                    }), e, null, [
                                        [7, 14]
                                    ])
                                })));
                                return function (t) {
                                    return e.apply(this, arguments)
                                }
                            }(), this.voyagerFetch(I(p, {
                                start: d,
                                count: i
                            })).then(v), e.abrupt("return", new Promise((function (e, t) {
                                y = e, m = t
                            })));
                        case 16:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(), j.prototype.formatVoyagerUrl = function () {
            var e = c()(a.a.mark((function e(t) {
                var r, n;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if ((r = t).includes("{profileId}") && (r = t.replace(/{profileId}/g, this.getProfileId())), !r.includes("{profileUrnId}")) {
                                e.next = 7;
                                break
                            }
                            return e.next = 5, this.getProfileUrnId();
                        case 5:
                            n = e.sent, r = r.replace(/{profileUrnId}/g, n);
                        case 7:
                            return r.startsWith("https") || (r = "https://www.linkedin.com/voyager/api" + r), e.abrupt("return", r);
                        case 9:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(), j.prototype.voyagerFetch = function () {
            var e = c()(a.a.mark((function e(t) {
                var r, n, o, s, c = this,
                    l = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return r = l.length > 1 && void 0 !== l[1] ? l[1] : {}, n = this, e.next = 4, n.formatVoyagerUrl(t);
                        case 4:
                            return o = e.sent, s = {}, n.preferLocale && (s = {
                                "x-li-lang": n.preferLocale
                            }), e.abrupt("return", new Promise((function (e, t) {
                                var a = S("JSESSIONID").replace(/"/g, "");
                                if (a) {
                                    var l = {
                                        credentials: "include",
                                        headers: F(F(F({}, s), r), {}, {
                                            accept: "application/vnd.linkedin.normalized+json+2.1",
                                            "csrf-token": a,
                                            "sec-fetch-mode": "cors",
                                            "sec-fetch-site": "same-origin"
                                        }),
                                        referrer: document.location.href,
                                        body: null,
                                        method: "GET",
                                        mode: "cors"
                                    };
                                    fetch(o, l).then((function (r) {
                                        if (200 !== r.status) {
                                            var o = "Error fetching internal API endpoint";
                                            t(new Error(o)), console.warn(o, r)
                                        } else r.text().then((function (o) {
                                            try {
                                                var a = JSON.parse(o);
                                                n.preferLocale && n.preferLocale !== i && (n.debugConsole.log("Checking for locale mapping and remapping if found."), C(a.included, c.preferLocale, !0)), e(a)
                                            } catch (e) {
                                                console.warn("Error parsing internal API response", r, e), t(e)
                                            }
                                        }))
                                    }))
                                } else t(new Error("Could not find valid LI cookie"))
                            })));
                        case 8:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(), j
    }()
}]);