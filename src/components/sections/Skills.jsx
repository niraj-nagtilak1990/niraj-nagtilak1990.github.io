import {
  SiDotnet, SiTypescript, SiJavascript, SiReact, SiVuedotjs, SiRedux,
  SiKubernetes, SiDocker, SiJenkins, SiGit, SiJest,
} from 'react-icons/si';
import {
  FiCloud, FiDatabase, FiTerminal, FiGitBranch, FiCode, FiServer,
} from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { skillCategories } from '../../data/skills.js';

const ICON_MAP = {
  SiDotnet:             SiDotnet,
  SiTypescript:         SiTypescript,
  SiJavascript:         SiJavascript,
  SiReact:              SiReact,
  SiVuedotjs:           SiVuedotjs,
  SiRedux:              SiRedux,
  SiMicrosoftazure:     FiCloud,
  SiAzuredevops:        FiGitBranch,
  SiKubernetes:         SiKubernetes,
  SiDocker:             SiDocker,
  SiJenkins:            SiJenkins,
  SiGit:                SiGit,
  SiPowershell:         FiTerminal,
  SiGithubactions:      FiGitBranch,
  SiMicrosoftsqlserver: FiDatabase,
  SiOracle:             FiDatabase,
  SiJest:               SiJest,
  SiCypress:            FiCode,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
              style={{ color: 'var(--foreground)' }}>
            Skills
          </h2>
          <p className="mb-12 text-base" style={{ color: 'var(--muted)' }}>
            Production-hardened across the full stack, from cloud infrastructure to browser UI.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, ci) => (
            <AnimatedSection key={cat.label} delay={ci * 0.1}>
              <div className="glass rounded-2xl p-6 h-full">
                <h3
                  className="font-display font-bold text-sm uppercase tracking-widest mb-4"
                  style={{ color: 'var(--primary)' }}
                >
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map(skill => {
                    const Icon = ICON_MAP[skill.icon];
                    return (
                      <div
                        key={skill.name}
                        className="skill-badge flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                        style={{
                          background: 'var(--surface)',
                          color: 'var(--foreground)',
                          border: '1px solid var(--border)',
                          cursor: 'default',
                        }}
                      >
                        {Icon && <Icon size={14} style={{ color: 'var(--primary)' }} />}
                        {skill.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
