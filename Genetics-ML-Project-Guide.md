# Genetics ML Project Guide for Le Wagon

**Quick Reference:** Data sources, project ideas, and step-by-step plan for building a genetics/genomics ML project

---

## 🎯 Why Genetics + ML?

Genetics sits at the intersection of **statistical inference** (causal mechanisms) and **predictive modeling** (risk prediction):
- **GWAS** uses statistical testing to find disease-associated variants
- **Polygenic Risk Scores (PRS)** use ML to predict individual disease risk
- **Gene-environment interactions** = feature interactions in ML
- Perfect bridge between your health stats background and ML skills!

---

## 📊 Data Sources (Open Access)

### ⭐ RECOMMENDED FOR BEGINNERS

#### 1. **GWAS Catalog** - Best for PRS
- **URL:** https://www.ebi.ac.uk/gwas/
- **What:** Summary statistics from published genome-wide association studies
- **Contains:** SNP IDs, p-values, effect sizes, odds ratios
- **Format:** TSV files
- **Use for:** Building polygenic risk scores, comparing diseases

#### 2. **ClinVar** - Best for Variant Classification
- **URL:** https://www.ncbi.nlm.nih.gov/clinvar/
- **What:** ~2 million variants labeled as pathogenic/benign/uncertain
- **Format:** VCF, TSV (~500MB)
- **Use for:** Binary classification (pathogenic vs benign prediction)
- **Download:** `wget https://ftp.ncbi.nlm.nih.gov/pub/clinvar/vcf_GRCh38/clinvar.vcf.gz`

#### 3. **PGS Catalog** - Best for Learning PRS Structure
- **URL:** https://www.pgscatalog.org/
- **What:** ~400 published polygenic scores with pre-calculated weights
- **Format:** TSV with SNP weights
- **Use for:** Benchmarking your PRS, understanding methodology

#### 4. **1000 Genomes Project** - Best for Ancestry Prediction
- **URL:** https://www.internationalgenome.org/
- **What:** Full genomes from 2,504 individuals across 26 populations
- **Format:** VCF files
- **Use for:** Ancestry prediction, population genetics, PCA visualization
- **Download subset:** `wget http://ftp.1000genomes.ebi.ac.uk/vol1/ftp/release/20130502/ALL.chr22.phase3_shapeit2_mvncall_integrated_v5b.20130502.genotypes.vcf.gz`

#### 5. **UK Biobank Summary Statistics**
- **URL:** https://www.nealelab.is/uk-biobank
- **What:** GWAS results for 4,000+ phenotypes (summary stats only, no individual data)
- **Format:** TSV (~100MB per phenotype)
- **Use for:** Building PRS for many diseases, comparing heritability

#### 6. **OpenSNP**
- **URL:** https://opensnp.org/
- **What:** ~7,000 crowdsourced genotype files from 23andMe/AncestryDNA users
- **Format:** 23andMe format (~20MB per person)
- **Use for:** Real consumer genetics data, personal genomics

---

## 🚀 Project Ideas (Ranked by Difficulty)

### **PROJECT 1: Build a Polygenic Risk Score (PRS)** ⭐ RECOMMENDED
- **Difficulty:** Moderate
- **Timeline:** 2-3 weeks
- **Data:** GWAS Catalog + 1000 Genomes (or simulated)
- **Skills:** Linear models, feature engineering, cross-validation
- **Output:** Predict disease risk from genetic variants
- **Clinical relevance:** Used for risk stratification in clinics today

### **PROJECT 2: Ancestry Prediction**
- **Difficulty:** Easy-Moderate
- **Timeline:** 1-2 weeks
- **Data:** 1000 Genomes
- **Skills:** PCA, clustering, multi-class classification
- **Output:** Predict population ancestry (European, African, Asian, etc.)

### **PROJECT 3: Variant Effect Prediction**
- **Difficulty:** Moderate-Hard
- **Timeline:** 2-3 weeks
- **Data:** ClinVar
- **Skills:** Binary classification, handling imbalanced data, feature engineering
- **Output:** Classify variants as pathogenic vs benign

### **PROJECT 4: Gene Expression Prediction**
- **Difficulty:** Hard
- **Timeline:** 3-4 weeks
- **Data:** GTEx (gene expression) + 1000 Genomes
- **Skills:** Regression, high-dimensional data, bioinformatics
- **Output:** Predict gene expression levels from genetic variants

---

## 📋 Recommended Project: PRS for Type 2 Diabetes

### **Why This Project?**
✅ Real-world clinical application
✅ Manageable scope for bootcamp
✅ Uses Le Wagon skills (pandas, sklearn, matplotlib)
✅ No special genetics software needed
✅ Open data (no approvals)
✅ Impressive portfolio piece
✅ Combines your health stats + ML background

---

## 🗓️ 3-Week Timeline

### **WEEK 1: Data Acquisition & Exploration**

**Days 1-2: Download GWAS data**
```python
import pandas as pd

# Download Type 2 Diabetes GWAS from GWAS Catalog
gwas_data = pd.read_csv('gwas_catalog_associations.tsv', sep='\t')

# Filter for T2D
t2d = gwas_data[gwas_data['DISEASE/TRAIT'].str.contains('Type 2 diabetes', case=False)]
```

**Days 3-4: Clean & explore**
```python
# Clean data
t2d_clean = t2d[['SNPS', 'CHR_ID', 'OR or BETA', 'P-VALUE']].dropna()

# Summary stats
print(f"Total SNPs: {len(t2d_clean)}")
print(f"Significant SNPs (p < 5e-8): {(t2d_clean['P-VALUE'] < 5e-8).sum()}")
```

**Day 5: Visualize**
```python
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Manhattan plot
plt.figure(figsize=(15, 5))
sns.scatterplot(x='CHR_ID', y=-np.log10(t2d_clean['P-VALUE']), data=t2d_clean)
plt.axhline(-np.log10(5e-8), color='red', linestyle='--', label='Genome-wide significance')
plt.title('Type 2 Diabetes GWAS Manhattan Plot')
plt.xlabel('Chromosome')
plt.ylabel('-log10(p-value)')
plt.show()
```

---

### **WEEK 2: Build PRS Model**

**Days 1-2: Get/simulate genotype data**

**Option A: Simulated data (easier for learning)**
```python
import numpy as np

# Simulate genotypes for 1000 individuals, 100 SNPs
# Genotypes: 0, 1, 2 (number of risk alleles)
n_individuals = 1000
n_snps = 100

# Genotype frequencies follow Hardy-Weinberg equilibrium
genotypes = np.random.choice([0, 1, 2], size=(n_individuals, n_snps), p=[0.25, 0.5, 0.25])

# Simulate disease status based on genetic risk
true_weights = np.random.normal(0.1, 0.05, n_snps)
genetic_risk = genotypes @ true_weights
disease_prob = 1 / (1 + np.exp(-genetic_risk))
disease_status = np.random.binomial(1, disease_prob)
```

**Option B: Real data from 1000 Genomes (more realistic)**
```python
import allel

# Read VCF file (chromosome 22 subset for speed)
vcf = allel.read_vcf('1000genomes_chr22.vcf.gz')
genotypes = vcf['calldata/GT']
```

**Days 3-4: Calculate PRS**
```python
def calculate_prs(genotypes, snp_weights):
    """
    Calculate polygenic risk score as weighted sum of risk alleles

    Parameters:
    -----------
    genotypes : array (n_individuals, n_snps)
        Genotype matrix with values 0, 1, 2
    snp_weights : array (n_snps,)
        Effect sizes (betas) from GWAS

    Returns:
    --------
    prs : array (n_individuals,)
        Polygenic risk score for each individual
    """
    prs = genotypes @ snp_weights  # Matrix multiplication
    return prs

# Get weights from GWAS (use beta or log(OR))
snp_weights = t2d_clean['OR or BETA'].values[:n_snps]

# Calculate PRS
prs_scores = calculate_prs(genotypes, snp_weights)
```

**Day 5: Try different PRS methods**
```python
# Method 1: P-value thresholding
prs_p01 = calculate_prs(genotypes, weights[p_values < 0.01])
prs_p001 = calculate_prs(genotypes, weights[p_values < 0.001])
prs_p5e8 = calculate_prs(genotypes, weights[p_values < 5e-8])

# Compare performance
from sklearn.metrics import roc_auc_score

auc_p01 = roc_auc_score(disease_status, prs_p01)
auc_p001 = roc_auc_score(disease_status, prs_p001)
auc_p5e8 = roc_auc_score(disease_status, prs_p5e8)

print(f"AUC (p < 0.01):  {auc_p01:.3f}")
print(f"AUC (p < 0.001): {auc_p001:.3f}")
print(f"AUC (p < 5e-8):  {auc_p5e8:.3f}")
```

---

### **WEEK 3: Evaluation & Visualization**

**Days 1-2: Model evaluation**
```python
from sklearn.metrics import roc_auc_score, roc_curve, confusion_matrix
from sklearn.model_selection import cross_val_score

# AUC
auc = roc_auc_score(disease_status, prs_scores)
print(f"AUC: {auc:.3f}")

# Risk stratification by percentile
prs_percentiles = pd.qcut(prs_scores, q=10, labels=False)
risk_by_percentile = pd.DataFrame({
    'percentile': prs_percentiles,
    'disease_status': disease_status
}).groupby('percentile')['disease_status'].mean()

print("\nDisease prevalence by PRS decile:")
print(risk_by_percentile)
```

**Days 3-4: Visualizations**
```python
# 1. PRS distribution
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Distribution by disease status
axes[0].hist(prs_scores[disease_status == 0], bins=30, alpha=0.5, label='Controls')
axes[0].hist(prs_scores[disease_status == 1], bins=30, alpha=0.5, label='Cases')
axes[0].set_xlabel('Polygenic Risk Score')
axes[0].set_ylabel('Frequency')
axes[0].set_title('PRS Distribution: Cases vs Controls')
axes[0].legend()

# 2. ROC curve
fpr, tpr, _ = roc_curve(disease_status, prs_scores)
axes[1].plot(fpr, tpr, label=f'PRS (AUC = {auc:.3f})', linewidth=2)
axes[1].plot([0, 1], [0, 1], 'k--', label='Random')
axes[1].set_xlabel('False Positive Rate')
axes[1].set_ylabel('True Positive Rate')
axes[1].set_title('ROC Curve')
axes[1].legend()
axes[1].grid(alpha=0.3)

plt.tight_layout()
plt.show()

# 3. Risk by percentile
plt.figure(figsize=(10, 6))
plt.bar(risk_by_percentile.index, risk_by_percentile.values, color='steelblue')
plt.xlabel('PRS Percentile (0 = lowest risk, 9 = highest risk)')
plt.ylabel('Disease Prevalence')
plt.title('Disease Risk by PRS Percentile')
plt.grid(axis='y', alpha=0.3)
plt.show()

# 4. Odds ratio by percentile
baseline_risk = risk_by_percentile.iloc[4]  # 50th percentile
odds_ratios = (risk_by_percentile / (1 - risk_by_percentile)) / (baseline_risk / (1 - baseline_risk))

plt.figure(figsize=(10, 6))
plt.bar(odds_ratios.index, odds_ratios.values, color='coral')
plt.axhline(1, color='red', linestyle='--', label='Baseline (50th percentile)')
plt.xlabel('PRS Percentile')
plt.ylabel('Odds Ratio vs Median')
plt.title('Relative Risk by PRS Percentile')
plt.legend()
plt.grid(axis='y', alpha=0.3)
plt.show()
```

**Day 5: Compare to published PRS**
```python
# Download published PRS from PGS Catalog
published_prs = pd.read_csv('PGS000001.txt', sep='\t')

# Compare your weights to published weights
comparison = pd.merge(
    t2d_clean[['SNPS', 'OR or BETA']],
    published_prs[['rsID', 'effect_weight']],
    left_on='SNPS',
    right_on='rsID'
)

plt.scatter(comparison['OR or BETA'], comparison['effect_weight'], alpha=0.5)
plt.xlabel('Your GWAS Beta')
plt.ylabel('Published PRS Weight')
plt.title('Comparison: Your Weights vs Published PRS')
plt.show()
```

---

## 🛠️ Technical Stack

### **Required Python Packages**
```bash
# Core data science
pip install pandas numpy matplotlib seaborn scikit-learn

# Genetics-specific (optional, for real VCF data)
pip install biopython          # Parse biological sequences
pip install scikit-allel       # Parse VCF files, population genetics
pip install cyvcf2             # Fast VCF parsing
pip install pysam              # BAM/VCF file handling
```

### **File Formats**

**VCF (Variant Call Format)** - Genotype data
```
#CHROM  POS     ID        REF  ALT  QUAL  FILTER  INFO
chr1    123456  rs12345   A    G    100   PASS    AF=0.3;DP=50
```

**GWAS Summary Statistics** - Association results
```
SNP        CHR  POS      P-VALUE   BETA    OR      SE
rs12345    1    123456   1.2e-8    0.15    1.16    0.03
```

**PRS Format** - Polygenic score weights
```
chr_name   chr_position   effect_allele   other_allele   effect_weight
1          123456         A               G              0.15
```

---

## 📚 Learning Resources

### **Essential Reading**
1. **PRS Tutorial:** https://choishingwan.github.io/PRS-Tutorial/
   - Step-by-step guide to building PRS
   - Uses real data (similar to your project)

2. **Nature Protocols PRS Guide (2020):**
   "Tutorial: a guide to performing polygenic risk score analyses"
   - Comprehensive methodology
   - Best practices

3. **Missing Heritability (Nature 2009):**
   "Finding the missing heritability of complex diseases"
   - Why variance explained ≠ predictive power
   - GWAS limitations

### **Code Examples**
- **PRS in Python:** https://github.com/pgscatalog/pypgx
- **Variant effect prediction:** https://github.com/Illumina/PrimateAI-3D
- **Population genetics:** https://github.com/quinlan-lab/applied-computational-genomics

### **Courses**
- **Broad Institute PRS Course:** https://www.youtube.com/channel/UCv3BE9UyftlqV1EYTMfcBmg
- **Coursera Genomic Data Science:** https://www.coursera.org/specializations/genomic-data-science

---

## ⚠️ Important Considerations

### **Ethics & Privacy**
✅ **DO:**
- Use public datasets with proper attribution
- Follow data use agreements
- Cite original GWAS studies
- Be transparent about limitations

❌ **DON'T:**
- Share individual-level data publicly
- Make clinical recommendations without validation
- Ignore population bias (most GWAS are European ancestry)
- Use patient data without IRB approval

### **Technical Challenges**
- **File sizes:** Genetics data can be huge (GBs-TBs). Start with chromosome subsets!
- **Linkage disequilibrium (LD):** SNPs are correlated, need pruning to avoid double-counting
- **Population stratification:** Models trained on Europeans fail for other populations
- **Missing data:** Genotypes have missing values, may need imputation

### **Statistical Considerations**
- **Multiple testing:** With millions of SNPs, need strict p-value thresholds (5×10⁻⁸)
- **Overfitting:** GWAS + PRS in same dataset → optimistic performance. Always validate in independent cohort
- **Winner's curse:** Discovered effects are overestimated. Effect sizes shrink in replication

---

## 🎯 Deliverables for Le Wagon

### **1. Jupyter Notebook**
- Data loading & cleaning
- Exploratory analysis (Manhattan plot, LD structure)
- PRS calculation
- Model evaluation
- Visualizations
- Clear markdown explanations

### **2. Presentation (10 slides)**
- Problem: Why predict genetic risk?
- Data: GWAS Catalog + 1000 Genomes
- Method: PRS calculation & optimization
- Results: AUC, risk stratification, visualizations
- Clinical impact: How this is used in healthcare
- Limitations: Population bias, missing heritability

### **3. README.md**
- Project overview
- Data sources & citations
- Installation instructions
- How to run the code
- Results summary
- Future improvements

### **4. (Optional) Streamlit Dashboard**
```python
import streamlit as st

st.title("Type 2 Diabetes Polygenic Risk Score Calculator")

# User inputs genotype
snp1 = st.selectbox("rs12345 genotype:", ["AA", "AG", "GG"])
snp2 = st.selectbox("rs67890 genotype:", ["CC", "CT", "TT"])
# ... more SNPs

# Calculate PRS
prs = calculate_prs(user_genotypes, weights)

# Show result
st.metric("Your PRS:", f"{prs:.2f}")
st.metric("Risk Percentile:", f"{percentile(prs):.0f}th")

# Visualization
st.pyplot(plot_risk_distribution(prs))
```

---

## 🚀 Next Steps

1. **Browse GWAS Catalog** - Pick a disease that interests you
2. **Download sample data** - Start with small files (chr22 only)
3. **Build data pipeline** - Load, clean, visualize
4. **Implement PRS calculation** - Start simple (weighted sum)
5. **Evaluate & iterate** - Try different thresholds, compare methods
6. **Polish & present** - Clean notebook, create visualizations

---

## 📝 Project Checklist

- [ ] Choose disease/trait (Type 2 Diabetes recommended)
- [ ] Download GWAS summary statistics
- [ ] Download/simulate genotype data
- [ ] Exploratory data analysis
- [ ] Implement PRS calculation
- [ ] Try multiple methods (p-value thresholds, LD pruning)
- [ ] Evaluate performance (AUC, calibration)
- [ ] Create visualizations (Manhattan plot, ROC curve, risk stratification)
- [ ] Compare to published PRS from PGS Catalog
- [ ] Write clear documentation
- [ ] Prepare presentation
- [ ] (Optional) Build interactive demo

---

## 💡 Pro Tips

1. **Start small:** Use chromosome 22 only (smallest chromosome) for initial testing
2. **Simulated data first:** Get pipeline working with fake data before dealing with VCF parsing
3. **Benchmark early:** Download published PRS from PGS Catalog to validate your approach
4. **Version control:** Git commit after each major milestone
5. **Document as you go:** Don't wait until the end to write explanations
6. **Ask for help:** Le Wagon instructors, online forums (Biostars, Reddit r/bioinformatics)

---

## 🔗 Quick Links

| Resource | URL |
|----------|-----|
| GWAS Catalog | https://www.ebi.ac.uk/gwas/ |
| PGS Catalog | https://www.pgscatalog.org/ |
| ClinVar | https://www.ncbi.nlm.nih.gov/clinvar/ |
| 1000 Genomes | https://www.internationalgenome.org/ |
| UK Biobank Summary Stats | https://www.nealelab.is/uk-biobank |
| PRS Tutorial | https://choishingwan.github.io/PRS-Tutorial/ |
| Biostars (Q&A) | https://www.biostars.org/ |
| scikit-allel docs | https://scikit-allel.readthedocs.io/ |

---

**Questions or stuck?** Check the resources above or ask Claude for help debugging! 🧬🤖

**Good luck with your project!** This is a fantastic way to combine your health statistics background with your new ML skills. 🚀
