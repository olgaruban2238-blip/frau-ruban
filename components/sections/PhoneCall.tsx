'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

// Каждый шаг — отдельный момент истории
// delay — сколько миллисекунд показывать этот шаг
const STEPS = [
  { id: 'call',    duration: 5000 },  // Видеозвонок Саши и Stan'а
  { id: 'olga',   duration: 4500 },  // Ольга на фоне
  { id: 'stan',   duration: 4500 },  // Stan повторяет
  { id: 'msg',    duration: 5500 },  // Саша пишет «Ждите звонка»
  { id: 'chat',   duration: 9000 },  // Диалог Привет / Здравствуйте / Давай знакомиться
  { id: 'end',    duration: 4000 },  // «Так началась эта история»
]

export default function PhoneCall() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-60px 0px' })
  const [stepIdx, setStepIdx] = useState(0)
  const [chatIdx, setChatIdx] = useState(0) // сколько сообщений показано в чате
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { lang } = useLang()
  const tr = t[lang]

  // Переход к следующему шагу (зацикленный)
  const advance = useCallback(() => {
    setStepIdx(prev => {
      const next = (prev + 1) % STEPS.length
      if (next === 0) setChatIdx(0) // сброс чата при повторе
      return next
    })
  }, [])

  // Планируем переход когда шаг становится активным
  useEffect(() => {
    if (!isInView) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(advance, STEPS[stepIdx].duration)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [stepIdx, isInView, advance])

  // Сброс при уходе из вьюпорта
  useEffect(() => {
    if (!isInView) {
      setStepIdx(0)
      setChatIdx(0)
    }
  }, [isInView])

  // Постепенно добавляем сообщения в чате
  useEffect(() => {
    if (STEPS[stepIdx]?.id !== 'chat') { setChatIdx(0); return }
    if (chatIdx >= 3) return
    const t = setTimeout(() => setChatIdx(p => p + 1), chatIdx === 0 ? 800 : 2200)
    return () => clearTimeout(t)
  }, [stepIdx, chatIdx])

  const step = STEPS[stepIdx].id

  return (
    <section
      ref={ref}
      id="story"
      style={{
        minHeight: '100svh',
        background: '#0d0b09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem 4rem',
        gap: '2rem',
      }}
    >
      {/* Вводная фраза */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          fontStyle: 'italic',
          color: 'rgba(158,142,120,0.75)',
          textAlign: 'center',
          maxWidth: '420px',
        }}
      >
        {tr.phone_intro}
      </motion.p>

      {/* ══ ТЕЛЕФОН ══ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 50 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '260px',
          height: '520px',
          borderRadius: '44px',
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
          background: 'linear-gradient(175deg, #0f1520 0%, #131b2e 40%, #0a0f1a 100%)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute', top: '14px',
          left: '50%', transform: 'translateX(-50%)',
          width: '90px', height: '28px',
          background: '#000', borderRadius: '20px', zIndex: 10,
        }} />

        {/* Status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between',
          padding: '10px 22px 0', zIndex: 11,
        }}>
          <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>22:47</span>
          <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>●●●</span>
        </div>

        {/* Индикатор прогресса — тонкая линия снизу */}
        <motion.div
          key={stepIdx}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: STEPS[stepIdx].duration / 1000, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '2px', originX: 0, zIndex: 20,
            background: 'linear-gradient(to right, rgba(100,165,200,0.6), rgba(196,168,130,0.6))',
          }}
        />

        {/* ══ Контент экрана ══ */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '55px 22px 20px',
        }}>
          <AnimatePresence mode="wait">

            {/* ── Шаг 1: Видеозвонок ── */}
            {step === 'call' && (
              <motion.div key="call"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', width: '100%' }}
              >
                <div style={{
                  width: '100%', height: '155px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1a2535, #0e1520)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '14px', position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      background: 'rgba(196,168,130,0.10)',
                      border: '1px solid rgba(196,168,130,0.20)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px',
                    }}
                  >📹</motion.div>

                  {/* Превью Саши */}
                  <div style={{
                    position: 'absolute', bottom: '8px', right: '8px',
                    width: '44px', height: '56px', borderRadius: '8px',
                    background: 'rgba(100,160,220,0.10)',
                    border: '1px solid rgba(100,160,220,0.20)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: '2px',
                  }}>
                    <span style={{ fontSize: '14px' }}>👤</span>
                    <span style={{ fontSize: '7px', color: 'rgba(180,215,235,0.55)', fontFamily: 'Inter, sans-serif' }}>{tr.phone_friend_preview}</span>
                  </div>
                </div>

                <p style={{
                  fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.30)', fontFamily: 'Inter, sans-serif', marginBottom: '4px',
                }}>{tr.phone_video}</p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '20px', color: 'rgba(255,255,255,0.85)', marginBottom: '4px',
                }}>Stan</p>
                <p style={{
                  fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif',
                }}>00:47</p>
              </motion.div>
            )}

            {/* ── Шаг 2: Ольга на фоне ── */}
            {step === 'olga' && (
              <motion.div key="olga"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.9 }}
                style={{ textAlign: 'center', width: '100%' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '52px', height: '52px', borderRadius: '50%',
                    background: 'rgba(196,168,130,0.08)',
                    border: '1px solid rgba(196,168,130,0.20)',
                    margin: '0 auto 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >🎙</motion.div>

                <p style={{
                  fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)', fontFamily: 'Inter, sans-serif', marginBottom: '12px',
                }}>{tr.phone_bg_label}</p>

                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '19px', fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.82)', lineHeight: 1.5,
                    marginBottom: '10px',
                  }}
                >
                  {tr.phone_quote1}
                </motion.p>
                <p style={{
                  fontSize: '10px', color: 'rgba(196,168,130,0.45)',
                  fontFamily: 'Inter, sans-serif',
                }}>— {tr.phone_olga}</p>
              </motion.div>
            )}

            {/* ── Шаг 3: Stan повторяет ── */}
            {step === 'stan' && (
              <motion.div key="stan"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.9 }}
                style={{ textAlign: 'center', width: '100%' }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(100,160,220,0.09)',
                  border: '1px solid rgba(100,160,220,0.20)',
                  margin: '0 auto 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                }}>🔊</div>

                <p style={{
                  fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)', fontFamily: 'Inter, sans-serif', marginBottom: '12px',
                }}>{tr.phone_stan_label}</p>

                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '19px', fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.82)', lineHeight: 1.5,
                    marginBottom: '10px',
                  }}
                >
                  {tr.phone_quote1}
                </motion.p>
                <p style={{
                  fontSize: '10px', color: 'rgba(100,180,220,0.50)',
                  fontFamily: 'Inter, sans-serif',
                }}>— Stan</p>
              </motion.div>
            )}

            {/* ── Шаг 4: Сообщение от Саши ── */}
            {step === 'msg' && (
              <motion.div key="msg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                style={{ width: '100%' }}
              >
                <p style={{
                  fontSize: '9px', letterSpacing: '0.10em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif',
                  marginBottom: '14px', textAlign: 'center',
                }}>{tr.phone_sasha_left}</p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '18px', padding: '14px 16px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50%',
                      background: 'rgba(196,168,130,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '9px',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: '#c8ad86',
                    }}>С</div>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.32)', fontFamily: 'Inter, sans-serif' }}>
                      {tr.phone_msg_name} · {tr.phone_just_now}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '15px', fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.82)', lineHeight: 1.45,
                  }}>
                    {tr.phone_msg_text}
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* ── Шаг 5: Диалог ── */}
            {step === 'chat' && (
              <motion.div key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{ width: '100%' }}
              >
                <p style={{
                  fontSize: '9px', letterSpacing: '0.10em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif',
                  marginBottom: '16px', textAlign: 'center',
                }}>{tr.phone_narrative}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { text: tr.chat_hi,   side: 'left',  author: tr.phone_name, color: 'rgba(100,175,230,0.45)' },
                    { text: tr.chat_hello, side: 'right', author: tr.phone_olga, color: 'rgba(196,168,130,0.45)' },
                    { text: tr.chat_meet,  side: 'left',  author: tr.phone_name, color: 'rgba(100,175,230,0.45)' },
                  ].slice(0, chatIdx).map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14, x: msg.side === 'left' ? -12 : 12 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.side === 'right' ? 'flex-end' : 'flex-start',
                        gap: '3px',
                      }}
                    >
                      <span style={{
                        fontSize: '8px', fontFamily: 'Inter, sans-serif',
                        color: msg.color, letterSpacing: '0.06em',
                      }}>{msg.author}</span>
                      <div style={{
                        padding: '10px 16px',
                        maxWidth: '85%',
                        background: msg.side === 'left'
                          ? 'rgba(100,165,220,0.09)'
                          : 'rgba(196,168,130,0.09)',
                        border: msg.side === 'left'
                          ? '1px solid rgba(100,165,220,0.18)'
                          : '1px solid rgba(196,168,130,0.18)',
                        borderRadius: msg.side === 'left'
                          ? '4px 16px 16px 16px'
                          : '16px 4px 16px 16px',
                      }}>
                        <p style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: '15px', color: '#f0ebe0', lineHeight: 1.35,
                        }}>{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Индикатор печатания */}
                  {chatIdx < 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        display: 'flex',
                        alignItems: chatIdx % 2 === 0 ? 'flex-start' : 'flex-end',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{
                        padding: '10px 16px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '12px',
                        display: 'flex', gap: '5px', alignItems: 'center',
                      }}>
                        {[0, 0.2, 0.4].map(d => (
                          <motion.div
                            key={d}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.9, delay: d, repeat: Infinity }}
                            style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Шаг 6: Финальная фраза ── */}
            {step === 'end' && (
              <motion.div key="end"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ textAlign: 'center', padding: '0 8px' }}
              >
                <div style={{
                  width: '1px', height: '40px',
                  background: 'linear-gradient(to bottom, transparent, rgba(196,168,130,0.35))',
                  margin: '0 auto 16px',
                }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                  fontStyle: 'italic',
                  color: 'rgba(196,168,130,0.90)',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                }}>
                  {tr.story_began_l1}<br />{tr.story_began_l2}
                </p>
                <div style={{
                  width: '1px', height: '40px',
                  background: 'linear-gradient(to top, transparent, rgba(196,168,130,0.35))',
                  margin: '16px auto 0',
                }} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
