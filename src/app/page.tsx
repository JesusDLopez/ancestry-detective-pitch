"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className={`min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-32 py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function DataPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-emerald-400">{value}</div>
      <div className="text-zinc-400 mt-2">{label}</div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 md:p-8">
      <h3 className="text-emerald-400 font-mono text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-zinc-950 text-white">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <p className="text-emerald-400 font-mono mb-4">Le Wagon Batch #2201 - Data Science</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            The Ancestry
            <span className="block text-emerald-400">Detective</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
            Unlocking Human History with Unsupervised Learning
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[600px] h-[600px] rounded-full border border-emerald-500/30" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-emerald-500/20" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-emerald-500/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 text-zinc-500 text-sm"
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* Section 1 - The Hook */}
      <Section>
        <div className="max-w-4xl">
          <p className="text-emerald-400 font-mono mb-4">01 / THE HOOK</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Reverse-engineering ancestry prediction
          </h2>

          <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
            <p>
              Companies like <span className="text-white font-semibold">23andMe</span> and <span className="text-white font-semibold">AncestryDNA</span> have
              built a multi-billion dollar industry telling people where their ancestors came from.
              But to most users, it feels like magic.
            </p>

            <p>
              <span className="text-emerald-400 font-semibold">It&apos;s not magic. It&apos;s dimensionality reduction.</span>
            </p>

            <p>
              In this project, we&apos;re going to build our own ancestry prediction engine from scratch.
              We&apos;ll take raw genetic data&mdash;millions of DNA variants per person&mdash;and use
              <span className="text-white font-semibold"> Principal Component Analysis (PCA)</span> to
              compress it down to just 3 dimensions that we can visualize.
            </p>

            <p>
              The result? A 3D map where people from the same continent cluster together,
              and we can predict where a new sample comes from by seeing which cluster it falls into.
            </p>
          </div>

          <div className="mt-12 p-6 bg-zinc-900/50 border-l-4 border-emerald-500 rounded-r-xl">
            <p className="text-zinc-400 italic">
              &ldquo;PCA on genetic data is the perfect case study for unsupervised learning&mdash;it reveals
              structure in high-dimensional data that maps directly to human history and geography.&rdquo;
            </p>
          </div>
        </div>
      </Section>

      {/* Section 2 - The Task */}
      <Section>
        <div className="max-w-5xl">
          <p className="text-emerald-400 font-mono mb-4">02 / THE TASK</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Machine Learning Challenge
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-3xl">
            We&apos;re tackling a classic ML problem: take extremely high-dimensional data and
            extract meaningful patterns that allow us to classify new samples.
          </p>

          {/* Input X */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <InfoCard title="INPUT DATA (X) &mdash; DNA VARIANTS">
              <p className="text-2xl font-semibold mb-4">~150,000 SNPs</p>

              <div className="space-y-4 text-zinc-300">
                <div>
                  <p className="text-white font-medium mb-1">What is a SNP?</p>
                  <p className="text-sm text-zinc-400">
                    A <span className="text-emerald-400">Single Nucleotide Polymorphism</span> is a position
                    in the genome where people differ by a single DNA letter (A, T, G, or C).
                  </p>
                </div>

                <div>
                  <p className="text-white font-medium mb-1">Why values 0, 1, or 2?</p>
                  <p className="text-sm text-zinc-400">
                    Each person has two copies of each chromosome. The value represents how many
                    copies carry the variant:
                  </p>
                  <div className="flex gap-4 mt-2 text-xs font-mono">
                    <span className="bg-zinc-800 px-3 py-1 rounded">0 = AA</span>
                    <span className="bg-zinc-800 px-3 py-1 rounded">1 = AB</span>
                    <span className="bg-zinc-800 px-3 py-1 rounded">2 = BB</span>
                  </div>
                </div>
              </div>
            </InfoCard>

            <InfoCard title="TARGET (y) &mdash; ANCESTRY LABELS">
              <p className="text-2xl font-semibold mb-4">7 Global Regions</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                  <span className="font-medium">AFR</span>
                  <span className="text-zinc-400 text-sm">African ancestry</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="font-medium">EUR</span>
                  <span className="text-zinc-400 text-sm">European ancestry</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                  <span className="font-medium">EAS</span>
                  <span className="text-zinc-400 text-sm">East Asian ancestry</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  <span className="font-medium">SAS</span>
                  <span className="text-zinc-400 text-sm">South Asian ancestry</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="font-medium">AMR</span>
                  <span className="text-zinc-400 text-sm">American (Indigenous) ancestry</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                  <span className="font-medium">CSA</span>
                  <span className="text-zinc-400 text-sm">Central/South Asian ancestry</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                  <span className="font-medium">OCE</span>
                  <span className="text-zinc-400 text-sm">Oceanian ancestry</span>
                </div>
              </div>
            </InfoCard>
          </div>

          {/* ML Approach */}
          <InfoCard title="THE LEARNING PLAYGROUND">
            <div className="space-y-8">
              <p className="text-zinc-300 text-lg">
                This project isn&apos;t just about one model; it&apos;s an arena for us to experiment,
                benchmark, and learn as a 4-person team.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold">1</div>
                    <p className="text-xl font-semibold">Model Benchmarking</p>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    <span className="text-white">Random Forest</span> is our baseline because it handles non-linear data well.
                    But can we beat it? This setup allows us to easily plug in <span className="text-white">XGBoost</span>,
                    <span className="text-white">SVMs</span>, or even a simple <span className="text-white">Neural Network</span> to compare performance.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold">2</div>
                    <p className="text-xl font-semibold">PCA Deep Dives</p>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    It&apos;s not just a black box. We can analyze the <span className="text-white">explained variance ratio</span> to see how much
                    signal we lose in 3D, or look at <span className="text-white">feature loadings</span> to identify exactly which SNPs drive the differences between populations.
                  </p>
                </div>
              </div>

              {/* Stretch Goal */}
              <div className="bg-zinc-950 rounded-xl p-5 border border-amber-500/20">
                <p className="font-semibold mb-2 text-amber-400">The &quot;Novembre 2008&quot; Stretch Goal</p>
                <p className="text-zinc-400 text-sm mb-3">
                  Can we recreate the famous <em>Nature</em> paper result where PCA coordinates
                  perfectly reconstruct the map of Europe?
                </p>
                <p className="text-xs text-zinc-500">
                  <span className="text-white font-medium">Data Source:</span> HGDP + 1kGP Harmonized (~4,094 samples).
                  <br/>
                  <span className="text-white font-medium">Goal:</span> Sub-continental prediction (e.g., France vs. Germany).
                </p>
              </div>

            </div>
          </InfoCard>

        </div>
      </Section>

      {/* Section 3 - The Data Story */}
      <Section>
        <div className="max-w-5xl">
          <p className="text-emerald-400 font-mono mb-4">03 / THE DATA</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Data Story
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-3xl">
            Finding the right dataset was its own ML problem&mdash;balancing accuracy, diversity, and feasibility.
          </p>

          {/* Three Act Data Journey */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Act 1: The Prototype */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <div className="text-3xl mb-4">&#x1F3C3;</div>
              <p className="text-zinc-500 font-mono text-xs mb-2">ACT 1</p>
              <h3 className="text-xl font-bold mb-2">The Prototype</h3>
              <p className="text-emerald-400 font-semibold mb-1">1000 Genomes Chr22</p>
              <p className="text-2xl font-bold text-white mb-3">196 MB</p>
              <p className="text-zinc-400 text-sm">
                Fast iteration, proof of concept. Single chromosome to validate the pipeline works.
              </p>
            </div>

            {/* Act 2: The Monster */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-red-500/30">
              <div className="text-3xl mb-4">&#x1F480;</div>
              <p className="text-zinc-500 font-mono text-xs mb-2">ACT 2</p>
              <h3 className="text-xl font-bold mb-2">The Monster</h3>
              <p className="text-red-400 font-semibold mb-1">HGDP+1kGP Raw VCF</p>
              <p className="text-2xl font-bold text-white mb-3">55 GB <span className="text-sm text-zinc-500">(just Chr22!)</span></p>
              <p className="text-zinc-400 text-sm">
                Full genome = 1+ TB. Impossible for laptop or cloud free tier. We needed another way.
              </p>
            </div>

            {/* Act 3: The Solution */}
            <div className="bg-zinc-900 rounded-2xl p-6 border-2 border-emerald-500/50">
              <div className="text-3xl mb-4">&#x2713;</div>
              <p className="text-emerald-400 font-mono text-xs mb-2">ACT 3</p>
              <h3 className="text-xl font-bold mb-2 text-emerald-400">The Solution</h3>
              <p className="text-emerald-400 font-semibold mb-1">HGDP+1kGP PLINK Binary</p>
              <p className="text-2xl font-bold text-white mb-3">180 MB <span className="text-sm text-emerald-400">(WHOLE GENOME!)</span></p>
              <p className="text-zinc-400 text-sm">
                LD-pruned, signal-focused, industry standard. This is what gnomAD uses.
              </p>
            </div>
          </div>

          {/* Size Comparison Visualization */}
          <div className="bg-zinc-900/50 rounded-2xl p-6 mb-12">
            <p className="text-zinc-400 font-mono text-sm mb-4">SIZE COMPARISON</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">Raw VCF (Chr22 only)</span>
                  <span className="text-red-400">55 GB</span>
                </div>
                <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500/70 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">PLINK Binary (ALL 22 chromosomes)</span>
                  <span className="text-emerald-400">180 MB</span>
                </div>
                <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '0.33%' }} />
                </div>
              </div>
            </div>
            <p className="text-zinc-500 text-xs mt-4">
              The PLINK format achieves 300x compression by storing only LD-pruned, signal-focused SNPs in binary format.
            </p>
          </div>

          {/* Updated Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            <DataPoint value="4,094" label="Individuals" />
            <DataPoint value="80" label="Populations" />
            <DataPoint value="7" label="Global Regions" />
          </div>

          {/* Data Formats */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <InfoCard title="INPUT FORMAT &mdash; VCF (VARIANT CALL FORMAT)">
              <p className="text-zinc-300 mb-4">
                VCF is the industry-standard format for storing genetic variant data. Each row represents
                a position in the genome where variation exists.
              </p>
              <div className="bg-zinc-950 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                <p className="text-zinc-500"># CHROM  POS      ID        REF  ALT  ...  SAMPLE1  SAMPLE2</p>
                <p className="text-zinc-300">chr1     16050075 rs12345   A    G    ...  0/0      0/1</p>
                <p className="text-zinc-300">chr1     16050115 rs67890   C    T    ...  1/1      0/1</p>
              </div>
              <p className="text-zinc-500 text-sm mt-3">
                <span className="text-emerald-400">0/0</span> = homozygous reference,
                <span className="text-emerald-400 ml-2">0/1</span> = heterozygous,
                <span className="text-emerald-400 ml-2">1/1</span> = homozygous alternate
              </p>
            </InfoCard>

            <InfoCard title="OPTIMIZED FORMAT &mdash; PLINK BINARY">
              <p className="text-zinc-300 mb-4">
                PLINK binary format (.bed/.bim/.fam) is the gold standard for genome-wide data.
                Stores genotypes in 2-bit encoding for extreme compression.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono">.bed</span>
                  <span className="text-zinc-400">Binary genotype matrix (2 bits per call)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono">.bim</span>
                  <span className="text-zinc-400">SNP info (chromosome, position, alleles)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono">.fam</span>
                  <span className="text-zinc-400">Sample info (ID, population, sex)</span>
                </div>
              </div>
            </InfoCard>
          </div>

          {/* Preprocessing */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <InfoCard title="PREPROCESSING STEP 1 &mdash; MAF FILTERING">
              <p className="text-white font-medium mb-2">Minor Allele Frequency Filter</p>
              <p className="text-zinc-400 text-sm mb-4">
                We remove SNPs where the less common variant appears in fewer than 1% of people.
                These rare variants are often sequencing errors or provide no population-level signal.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-500">Genome-wide:</span>
                <span className="text-white">~50M Variants</span>
                <span className="text-emerald-400">&rarr;</span>
                <span className="text-emerald-400">~5M common SNPs</span>
              </div>
            </InfoCard>

            <InfoCard title="PREPROCESSING STEP 2 &mdash; LD PRUNING">
              <p className="text-white font-medium mb-2">Linkage Disequilibrium Pruning</p>
              <p className="text-zinc-400 text-sm mb-4">
                Nearby SNPs are often correlated (inherited together). LD pruning removes redundant SNPs,
                which is why the PLINK file is so compact while preserving signal.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-500">After LD pruning:</span>
                <span className="text-emerald-400">~150,000 SNPs</span>
                <span className="text-zinc-500">(signal-focused)</span>
              </div>
            </InfoCard>
          </div>

          {/* Validation Badge */}
          <div className="mt-8 bg-emerald-950/50 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-semibold">Data Validation: PASSED</span>
            </div>
            <ul className="text-zinc-400 space-y-2 text-sm">
              <li>HGDP+1kGP PLINK files downloaded from gnomAD</li>
              <li>4,094 samples across 80 populations, 7 global regions</li>
              <li>~150,000 LD-pruned SNPs covering all 22 autosomes</li>
              <li>180 MB total &mdash; fits comfortably on laptop</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Section 4 - The Demo */}
      <Section>
        <div className="max-w-5xl">
          <p className="text-emerald-400 font-mono mb-4">04 / THE DEMO</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Interactive 3D Ancestry Map
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-3xl">
            The end product: a web app where users can upload their genetic data and see
            their predicted ancestry visualized in 3D space.
          </p>

          {/* 3D Visualization Placeholder */}
          <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -left-32 -top-16 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute left-16 top-8 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl" />
                <div className="absolute -right-20 -top-8 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl" />
                <div className="absolute -left-8 top-28 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                <div className="absolute right-8 top-20 w-28 h-28 bg-red-500/20 rounded-full blur-2xl" />

                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-5 h-5 bg-white rounded-full shadow-lg shadow-white/50"
                />
              </div>
            </div>

            <div className="absolute top-4 left-4 text-xs text-zinc-500">
              3D PCA projection &mdash; each dot is a person
            </div>

            <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full" /> EUR</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> AFR</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full" /> EAS</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-full" /> SAS</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" /> AMR</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full" /> New sample</span>
            </div>
          </div>

          {/* Step by Step */}
          <h3 className="text-xl font-semibold mb-6">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard title="STEP 1">
              <p className="text-xl font-semibold mb-3">Upload VCF File</p>
              <p className="text-zinc-400 text-sm">
                The user uploads their raw genetic data file. This is the same format you get
                when you download your data from 23andMe or AncestryDNA. It contains their
                genotype calls at hundreds of thousands of positions.
              </p>
              <p className="text-zinc-500 text-xs mt-3 font-mono">
                Input: .vcf or .vcf.gz file (~20MB)
              </p>
            </InfoCard>

            <InfoCard title="STEP 2">
              <p className="text-xl font-semibold mb-3">Parse & Transform</p>
              <p className="text-zinc-400 text-sm">
                The backend extracts genotypes from the VCF, filters to the SNPs our model
                knows about, and applies the pre-trained PCA transformation to project the
                new sample into 3D space.
              </p>
              <p className="text-zinc-500 text-xs mt-3 font-mono">
                VCF &rarr; numpy array &rarr; PCA transform &rarr; [x, y, z]
              </p>
            </InfoCard>

            <InfoCard title="STEP 3">
              <p className="text-xl font-semibold mb-3">Predict & Visualize</p>
              <p className="text-zinc-400 text-sm">
                The Random Forest classifier predicts the most likely ancestry. The user sees
                their dot appear on the 3D map, positioned among the reference populations,
                with probability scores for each ancestry.
              </p>
              <p className="text-zinc-500 text-xs mt-3 font-mono">
                Output: &ldquo;You are 94% East Asian&rdquo;
              </p>
            </InfoCard>
          </div>
        </div>
      </Section>

      {/* Section 5 - How We'll Build It */}
      <Section>
        <div className="max-w-5xl">
          <p className="text-emerald-400 font-mono mb-4">05 / THE APPROACH</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How We&apos;ll Build It
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-3xl">
            Our tech stack and what each tool does in the pipeline.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Backend */}
            <div>
              <h3 className="text-zinc-400 font-mono text-sm mb-6">BACKEND (PYTHON)</h3>

              <div className="space-y-4">
                <div className="bg-zinc-900 rounded-xl p-5">
                  <p className="font-semibold mb-2">scikit-allel</p>
                  <p className="text-zinc-400 text-sm">
                    Specialized library for parsing VCF files into numpy arrays. Handles the
                    complex genotype encoding and can efficiently process large genomic datasets.
                  </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-5">
                  <p className="font-semibold mb-2">scikit-learn</p>
                  <p className="text-zinc-400 text-sm">
                    The core ML library. We&apos;ll use <code className="text-emerald-400">PCA</code> for
                    dimensionality reduction and <code className="text-emerald-400">RandomForestClassifier</code> for
                    ancestry prediction. Models are saved as <code className="text-emerald-400">.joblib</code> files.
                  </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-5">
                  <p className="font-semibold mb-2">FastAPI</p>
                  <p className="text-zinc-400 text-sm">
                    Modern Python web framework for serving our model as a REST API.
                    Exposes a <code className="text-emerald-400">POST /predict</code> endpoint that accepts
                    VCF data and returns ancestry predictions.
                  </p>
                </div>
              </div>
            </div>

            {/* Frontend */}
            <div>
              <h3 className="text-zinc-400 font-mono text-sm mb-6">FRONTEND (REACT)</h3>

              <div className="space-y-4">
                <div className="bg-zinc-900 rounded-xl p-5">
                  <p className="font-semibold mb-2">Next.js</p>
                  <p className="text-zinc-400 text-sm">
                    React framework for building the user interface. Handles file uploads,
                    API calls to the backend, and rendering the results page.
                  </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-5">
                  <p className="font-semibold mb-2">Plotly.js (The MVP)</p>
                  <p className="text-zinc-400 text-sm">
                    Our baseline for scientific visualization. It handles 3D scatter plots cleanly
                    out of the box, allowing us to focus on the data pipeline first.
                  </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-5 border border-emerald-500/20">
                  <p className="font-semibold mb-2 text-emerald-400">Three.js / Fiber (The Stretch ?)</p>
                  <p className="text-zinc-400 text-sm">
                    If we nail the MVP, we level up to a custom cinematic experience with
                    React Three Fiber. Custom shaders, glowing particles, and &ldquo;Apple-style&rdquo;
                    smoothness.
                  </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-5">
                  <p className="font-semibold mb-2">Tailwind CSS</p>
                  <p className="text-zinc-400 text-sm">
                    Utility-first CSS framework for rapid UI development. Keeps our frontend
                    code clean and consistent without writing custom stylesheets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deployment */}
          <div className="mt-8 bg-zinc-900 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Deployment Strategy</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-emerald-400 font-mono mb-2">FRONTEND</p>
                <p className="text-zinc-400">Vercel (free tier) &mdash; automatic deploys from GitHub</p>
              </div>
              <div>
                <p className="text-emerald-400 font-mono mb-2">BACKEND</p>
                <p className="text-zinc-400">Render or Google Cloud Run &mdash; containerized FastAPI</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <section className="min-h-[40vh] flex flex-col justify-center items-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-zinc-400 text-lg mb-4">
            Le Wagon Batch #2201 &mdash; Data Science
          </p>
          <p className="text-2xl font-semibold">
            Jesus Lopez & Team
          </p>
        </motion.div>
      </section>
    </div>
  );
}
